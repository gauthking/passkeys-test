export enum PASSKEY_ERRORS {
    USER_REJECTED_CREDENTIAL = 'The user rejected the creation of the Passkey, likely due to canceling the prompt.',
    UNABLE_TO_RETRIEVE_CREDENTIAL = 'The get request failed, either due to lack of credentials in device or user cancelling action.',
    BROWSER_DOES_NOT_SUPPORT_PASSKEY = 'The browser does not support Passkey, or the context does not expose it (e.g. a non-HTTPS page).',
    CREDENTIAL_NOT_CREATED = 'The credential has not been created yet.',
    ERROR_RETRIEVING_RAW_ID = 'There was an error retrieving the rawId from the credential.',
}

