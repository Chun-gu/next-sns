import { createContext, useContext } from "react";

import { cn } from "../lib/utils";

import type { HTMLAttributes, ReactNode } from "react";

type LengthIndicatorContextValue = {
	currLength?: number;
	maxLength?: number;
};

const LengthIndicatorContext = createContext<LengthIndicatorContextValue>({
	currLength: 0,
});

function useLengthIndicator() {
	const lengthIndicatorContextValue = useContext(LengthIndicatorContext);

	if (lengthIndicatorContextValue === undefined) {
		throw new Error(
			"useLengthIndicator should be used within <LengthIndicator>",
		);
	}

	return {
		currLength: lengthIndicatorContextValue.currLength,
		maxLength: lengthIndicatorContextValue.maxLength,
	};
}

interface LengthIndicatorProps extends LengthIndicatorContextValue {
	children: ReactNode;
}

const LengthIndicator = ({
	children,
	maxLength,
	currLength = 0,
}: LengthIndicatorProps) => {
	return (
		<LengthIndicatorContext.Provider value={{ currLength, maxLength }}>
			{children}
		</LengthIndicatorContext.Provider>
	);
};

const CurrLength = ({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) => {
	const { currLength } = useLengthIndicator();

	return (
		<span className={cn("text-sm font-normal", className)} {...props}>
			{currLength}
		</span>
	);
};

const MaxLength = ({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) => {
	const { maxLength } = useLengthIndicator();

	if (maxLength === undefined) return null;

	return (
		<span className={cn("text-sm font-normal", className)} {...props}>
			/{maxLength}
		</span>
	);
};

export { LengthIndicator, CurrLength, MaxLength };
