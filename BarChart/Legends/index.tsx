import React, { FunctionComponent, memo, Fragment } from 'react';
import Legend from './Legend';
import styles from '../BarChart.css';

export interface LegendsProps {
	width?: number;
	labels: Array<string | number>;
}

const Legends: FunctionComponent<LegendsProps> = memo(({ width, labels }) => (
	<div
		className={styles.legendContainer}
		style={{ width }}
	>
		{labels.map((vLabel: (string | number), labelId: number) => (
			<Fragment
				key={labelId}
			>
				<Legend
					legendName={vLabel}
					legendId={labelId}
				/>
				{labelId % 5 === 0 && labelId !== 0 && (<br />)}
			</Fragment>
		))}
	</div>
));

export default Legends;
