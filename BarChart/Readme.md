```js
import Radio from '../Radio';
initialState = { direction: 'vertical', isStacked: false, isPercentage: false };

const directions = ['vertical', 'horizontal'];
const stacked = [false, true];
const percentage = [false, true];
const data = [
	[41, 29, 18, 5, 2],
	[29, 18, 5, 2, 41],
	[18, 5, 2, 41, 29],
	[5, 2, 41, 29, 18],
	[2, 41, 29, 18, 5],
];
const vLabels = ['親友介紹', '網路搜尋', '部落格文章', 'Facebook', 'Instagram'];
const hLabels = [
	'使用與耐用程度符合你的需求 - very satisfied',
	'使用與耐用程度符合你的需求 - satisfied',
	'使用與耐用程度符合你的需求 - No Opinion',
	'使用與耐用程度符合你的需求 - Dissatisfied',
	'使用與耐用程度符合你的需求 - very Dissatisfied',
];

<div>
	<div>
		direction: {state.direction}
		<Radio
			value={state.direction}
			onChange={direction => setState({ direction })}
		>
			{directions.map(direction => (
				<Radio.Option
					key={direction}
					value={direction}
				>
					{direction}
				</Radio.Option>
			))}
		</Radio>
	</div>
	<div>
		isStacked: {`${state.isStacked}`}
		<Radio
			value={state.isStacked}
			onChange={isStacked => setState({ isStacked })}
		>
			{stacked.map(st => (
				<Radio.Option
					key={`${st}`}
					value={st}
				>
					{`${st}`}
				</Radio.Option>
			))}
		</Radio>
	</div>
		<div>
		isPercentage: {`${state.isPercentage}`}
		<Radio
			value={state.isPercentage}
			onChange={isPercentage => setState({ isPercentage })}
		>
			{percentage.map(st => (
				<Radio.Option
					key={`${st}`}
					value={st}
				>
					{`${st}`}
				</Radio.Option>
			))}
		</Radio>
	</div>
	<br />
	<br />
	<br />
	<BarChart
		direction={state.direction}
		data={data}
		vLabels={vLabels}
		hLabels={hLabels}
		isStacked={state.isStacked}
		isPercentage={state.isPercentage}
	/>
</div>
```
