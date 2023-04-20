/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CommunityCreateFormInputValues = {
    type?: string;
    title?: string;
    description?: string;
    image?: string;
    date?: string;
    time?: string;
    phone_number?: string;
    location?: string;
    user?: string;
};
export declare type CommunityCreateFormValidationValues = {
    type?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    phone_number?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
    user?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CommunityCreateFormOverridesProps = {
    CommunityCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    phone_number?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    user?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CommunityCreateFormProps = React.PropsWithChildren<{
    overrides?: CommunityCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CommunityCreateFormInputValues) => CommunityCreateFormInputValues;
    onSuccess?: (fields: CommunityCreateFormInputValues) => void;
    onError?: (fields: CommunityCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CommunityCreateFormInputValues) => CommunityCreateFormInputValues;
    onValidate?: CommunityCreateFormValidationValues;
} & React.CSSProperties>;
export default function CommunityCreateForm(props: CommunityCreateFormProps): React.ReactElement;
