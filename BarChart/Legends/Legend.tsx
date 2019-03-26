import React, { FunctionComponent, memo } from 'react';
import { colors } from '../config';
import styles from '../BarChart.css';

export interface LegendProps {
	legendName: string | number;
	legendId: number;
}

const Legend: FunctionComponent<LegendProps> = memo(({ legendName, legendId }) => (
	<div className={styles.legend}>
		<div
			className={styles.legendBlock}
			style={{ backgroundColor: colors[legendId] }}
		/>
		<span>
			{legendName}
		</span>
	</div>
));

export default Legend;
