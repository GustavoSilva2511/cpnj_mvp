export interface MunicipalityFilter {
    id: string,
    state: string,
    description: string,
    code: string
}

export type MunicipalityFilters = Array<MunicipalityFilter>