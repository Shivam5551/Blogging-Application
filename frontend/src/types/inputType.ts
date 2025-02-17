export type InputType = {
    heading: string;
    readonly id: string;
    placeholder: string;
    type: string;
    readonly value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
