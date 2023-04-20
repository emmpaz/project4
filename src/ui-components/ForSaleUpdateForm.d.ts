/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ForSale } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ForSaleUpdateFormInputValues = {
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
export declare type ForSaleUpdateFormValidationValues = {
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
export declare type ForSaleUpdateFormOverridesProps = {
    ForSaleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type ForSaleUpdateFormProps = React.PropsWithChildren<{
    overrides?: ForSaleUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    forSale?: ForSale;
    onSubmit?: (fields: ForSaleUpdateFormInputValues) => ForSaleUpdateFormInputValues;
    onSuccess?: (fields: ForSaleUpdateFormInputValues) => void;
    onError?: (fields: ForSaleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ForSaleUpdateFormInputValues) => ForSaleUpdateFormInputValues;
    onValidate?: ForSaleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ForSaleUpdateForm(props: ForSaleUpdateFormProps): React.ReactElement;
