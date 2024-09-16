
export const QueryFilter = memo(({ filters, setFilters, placeholder }) => {
    const handleChange = debounce((e) => {
       const newQuery = e.target.value;
       setFilters({ ...filters, query: newQuery });
    }, 350)
    
    return (
       <div className="filter_item query_filter">
          <label className="filter_label">Matn</label>
          <input
             type="search"
             defaultValue={filters?.query}
             placeholder={placeholder}
             onChange={handleChange}
          />
       </div>
    )
 })

export const CustomSelect = memo(({ setFilters, options, placeholder, keyer, label, value }) => {
    return (
        <React.Fragment>
            <label className="filter_label">{label}</label>
            <Select
                value={value}
                theme={theme}
                options={options}
                styles={customStyles}
                placeholder={placeholder}
                onChange={event => {
                    setFilters(filters => ({
                    ...filters,
                    [keyer]: event.value,
                    }))
                }}
            />
        </React.Fragment>
    )
})

export const TournamentFilter = memo(({ filters, setFilters }) => {
    const branches = useBranches()
    const options = [{ label: "Barcha filial", value: "" }, ...branches]
    return (
        <div className="filter_item branch_filter">
            <CustomSelect
                keyer='branch_id'
                label={"Filial"}
                value={options?.filter((item) => filters.branch_id === item.value)[0]}
                options={options}
                filters={filters}
                setFilters={setFilters}
                placeholder={'Filiallar...'}
            />
        </div>
    )
})

export const CompetitionFilter = memo(({ filters, setFilters }) => {
    const branches = useBranches()
    const options = [{ label: "Barcha filial", value: "" }, ...branches]
    return (
        <div className="filter_item branch_filter">
            <CustomSelect
                keyer='branch_id'
                label={"Filial"}
                value={options?.filter((item) => filters.branch_id === item.value)[0]}
                options={options}
                filters={filters}
                setFilters={setFilters}
                placeholder={'Filiallar...'}
            />
        </div>
    )
 })