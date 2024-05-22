type ParseDTOResponse<T> = { isValid: true; data: T } | { isValid: false; errors: string[] };

export default ParseDTOResponse;
