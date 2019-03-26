import styles from './BarChart.css';

export interface TooltipPlaceholder {
	readonly role: string;
	readonly p: {
		readonly html: boolean;
	};
}

export const tooltipPlaceholder: TooltipPlaceholder = {
	role: 'tooltip',
	p: { html: true },
};

export const formatTooltip = (
	value: number,
	labelName: (TooltipPlaceholder | string | number),
	portion: number,
	legendColor: string
) => (`
		<div class=${styles.tooltipContent}>
			<div class=${styles.tooltipLegendContainer}>
				<div class=${styles.tooltipLegend} style="background-color: ${legendColor};"></div>
			</div>
			<div>
				<h5 class=${styles.label}>${labelName}</h5>
				<span class=${styles.value}>${value}（${portion}％）</span>
			</div>
		</div>
`);
