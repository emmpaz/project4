/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Housing } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HousingUpdateFormInputValues = {
    type?: string;
    title?: string;
    description?: string;
    image?: string;
    price?: number;
    date?: string;
    time?: string;
    phone_number?: string;
    location?: string;
    user?: string;
};
export declare type HousingUpdateFormValidationValues = {
    type?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
    date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    phone_number?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
    user?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HousingUpdateFormOverridesProps = {
    HousingUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    phone_number?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    user?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HousingUpdateFormProps = React.PropsWithChildren<{
    overrides?: HousingUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    housing?: Housing;
    onSubmit?: (fields: HousingUpdateFormInputValues) => HousingUpdateFormInputValues;
    onSuccess?: (fields: HousingUpdateFormInputValues) => void;
    onError?: (fields: HousingUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HousingUpdateFormInputValues) => HousingUpdateFormInputValues;
    onValidate?: HousingUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HousingUpdateForm(props: HousingUpdateFormProps): React.ReactElement;
