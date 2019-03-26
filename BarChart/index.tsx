import React, { HTMLAttributes, Component } from 'react';
import Chart from 'react-google-charts';
import { ChartWrapperOptions } from 'react-google-charts/dist/types';
import classnames from 'classnames';
import { defaultOptions, colors } from './config';
import { formatTooltip, tooltipPlaceholder, TooltipPlaceholder } from './tooltip';
import Legends from './Legends';
import styles from './BarChart.css';

export type BarChartLabel = string | number;

export type BarChartLabelWithTooltip = BarChartLabel | TooltipPlaceholder;

interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
	direction: 'vertical' | 'horizontal';
	isStacked?: boolean;
	isPercentage?: boolean;
	className?: string;
	data: number[][];
	vLabels: BarChartLabel[];
	hLabels: BarChartLabel[];
	options: ChartWrapperOptions;
}

interface BarChartState {
	isStacked?: boolean;
	isPercentage?: boolean;
	options: ChartWrapperOptions;
}

export default class BarChart extends Component<BarChartProps, BarChartState> {
	static getDerivedStateFromProps(props: BarChartProps, state: BarChartState) {
		if (
			props.isStacked !== state.isStacked ||
			props.isPercentage !== state.isPercentage
		) {
			const axisKey = props.direction === 'horizontal' ? 'hAxis' : 'vAxis';
			return {
				options: {
					...state.options,
					isStacked: props.isStacked,
					[axisKey]: {
						...state.options[axisKey],
						format: props.isPercentage ? '#\'%\'' : '#',
					},
				},
				isStacked: props.isStacked,
				isPercentage: props.isPercentage,
			};
		}

		return null;
	}

	static defaultProps = {
		isStacked: false,
		isPercentage: false,
		options: defaultOptions,
	};

	state = {
		isStacked: this.props.isStacked,
		isPercentage: this.props.isPercentage,
		options: this.props.options,
	};

	getData = () => {
		const vLabelsArr = this.attachTooltipsLabel();
		const hLabelsArr = this.splitLabelText();
		const dataPortion = this.calcPortion();

		return [
			[...vLabelsArr],
			...this.formatData(
				vLabelsArr,
				hLabelsArr,
				dataPortion
			),
		];
	}

	resizeChart = () => {
		const { direction, hLabels, isStacked } = this.props;
		const { options } = this.state;
		const numGroups = hLabels.length;
		const horizontal = direction === 'horizontal';
		const verticalStackedWidth = (isStacked ? 180 : 300) * numGroups;

		return {
			...options,
			chartArea: {
				width: horizontal ? '60%' : '80%',
				height: horizontal ? '90%' : '70%',
			},
			bar: {
				...options.bar,
				groupWidth: isStacked ? '55%' : '70%',
			},
			width: horizontal ? 920 : verticalStackedWidth,
			height: horizontal ? (220 * numGroups) : 500,
		};
	}

	formatData = (
		vLabelArr: BarChartLabelWithTooltip[],
		hLabelArr: BarChartLabel[],
		dataPercent: number[][]
	) => {
		const chartData = this.props.isPercentage ? dataPercent : this.props.data;
		return hLabelArr.reduce(
			(accData, hLabel, rowId) => ([
				...accData,
				vLabelArr.reduce(
					(accRow, item, itemId) => {
						if (itemId === 0) {
							return [...accRow, hLabel];
						}
						if (item === tooltipPlaceholder) {
							const targetLabelId = itemId / 2 - 1;
							const tooltip = formatTooltip(
								this.props.data[rowId][targetLabelId],
								vLabelArr[itemId - 1],
								dataPercent[rowId][targetLabelId],
								colors[targetLabelId]
							);
							return [...accRow, tooltip];
						}
						const targetDataId = (itemId - 1) / 2;
						return [...accRow, chartData[rowId][targetDataId]];
					},
					[] as BarChartLabelWithTooltip[]
				),
			]),
			[] as BarChartLabelWithTooltip[][]
		);
	}

	attachTooltipsLabel = () => (
		this.props.vLabels.reduce((labels: BarChartLabelWithTooltip[], label: BarChartLabel) => (
			[...labels, label, tooltipPlaceholder]
		), [' '])
	)

	splitLabelText = () => (
		this.props.hLabels
			.reduce((splitLabels: Array<string | number>, sentence: (string | number)) => {
				const splitWords = `${sentence}`.match(/[\u00ff-\uffff]|\S+/g);
				let newLabelArr = '';
				if (splitWords) {
					newLabelArr = splitWords.reduce((newSentence: string, word: (string | number), index: number) => {
						const addedWord = (/^[a-zA-Z0-9- ]*$/.test(word.toString())) ? ` ${word} ` : word;
						return (index % 7 === 0 && index !== 0) ?
							(newSentence + addedWord + '\n')
							:
							(newSentence + addedWord);
					}, '');
				}
				return [...splitLabels, newLabelArr];
			}, [])
	)

	calcPortion = () => (
		this.props.data.reduce((portion: number[][], row: number[]) => {
			const sumOfRow = row.reduce((sum, el) => sum + el, 0);
			const rowPortion = row.reduce(
				(accRow: number[], el: number) => [...accRow, +(((el / sumOfRow) * 100).toFixed(2))],
				[]
			);
			return [...portion, rowPortion];
		}, [])
	)

	render() {
		const {
			className,
			direction,
			isStacked,
			isPercentage,
			data,
			vLabels,
			hLabels,
			options,
			...props
		} = this.props;
		const chartType = direction === 'horizontal' ? 'BarChart' : 'ColumnChart';
		const resizedOptions = this.resizeChart();
		const chartData = this.getData();

		return (
			<div
				{...props}
				className={classnames(styles.chartContainer, className)}
				style={{ overflowX: isStacked ? 'hidden' : 'auto' }}
			>
				<Chart
					key={chartType}
					chartType={chartType}
					data={chartData}
					options={resizedOptions}
				/>
				<Legends
					width={resizedOptions.width}
					labels={vLabels}
				/>
			</div>
		);
	}
}
