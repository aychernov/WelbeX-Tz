class Table {

    // Селектор table
    constructor(selector) {
        this.table = document.querySelector(selector)
        this.body = []
        this.data = [
            {'date': '17/01/2022', 'name': 'element', 'count': 1, 'distance': 1},
            {'date': '17/01/2022', 'name': 'element', 'count': 2, 'distance': 2},
            {'date': '17/01/2022', 'name': 'element', 'count': 3, 'distance': 3},
            {'date': '17/01/2022', 'name': 'element', 'count': 4, 'distance': 4},
            {'date': '17/01/2022', 'name': 'element', 'count': 5, 'distance': 5},
            {'date': '17/01/2022', 'name': 'element', 'count': 6, 'distance': 6},
            {'date': '17/01/2022', 'name': 'element', 'count': 7, 'distance': 7},
            {'date': '17/01/2022', 'name': 'element', 'count': 8, 'distance': 8},
            {'date': '17/01/2022', 'name': 'element', 'count': 9, 'distance': 9},
            {'date': '17/01/2022', 'name': 'element', 'count': 10, 'distance': 10},
            {'date': '17/01/2022', 'name': 'element', 'count': 11, 'distance': 11},
            {'date': '17/01/2022', 'name': 'element', 'count': 12, 'distance': 12},
            {'date': '17/01/2022', 'name': 'element', 'count': 13, 'distance': 13},
            {'date': '17/01/2022', 'name': 'element', 'count': 14, 'distance': 14},
            {'date': '17/01/2022', 'name': 'element', 'count': 15, 'distance': 15},
            {'date': '17/01/2022', 'name': 'element', 'count': 16, 'distance': 16},
            {'date': '17/01/2022', 'name': 'element', 'count': 17, 'distance': 17},
            {'date': '17/01/2022', 'name': 'element', 'count': 18, 'distance': 18},
            {'date': '17/01/2022', 'name': 'element', 'count': 19, 'distance': 19},
            {'date': '17/01/2022', 'name': 'element', 'count': 20, 'distance': 20},
        ] // заглушка json

        this.fetchData().then()

        // filter
        this.filter = {
            column: '',
            condition: '',
            value: ''
        }

        this.pagiSetup = {
            perPage: 5,
            page: 1,
            pages: 1,
            paginationButtons: []
        }

    }

    // header table
    renderHeader() {
        this.header = Object.keys(this.data[0]).map(key => `            
                <th data-column="${key}" data-order="desc">${key} &#8593</th>                       
        `)
    }

    // get API
    async fetchData() {
        const response = await fetch('http://js-php-sort-pagination-table/php-rest-api/')
        this.data = await response.json()
        this.render()
    }

    // Render htnml table
    renderBody(fdata) {
        const data = this.pagination(fdata ? fdata : this.data)
        this.paginationBtnsRender()
        this.body = []
        for (let i = 0; i < data.length; i++) {
            this.body[i] = `
                <tr>
                    <td>${data[i].date}</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].count}</td>
                    <td>${data[i].distance}</td>
                </tr>                
            `
        }
    }

    // Render html filter
    renderFilter() {
        const selectColumn = '<select name="column[]" id="column">' + '<option disabled selected>Колонка</option>' +
            Object.keys(this.data[0]).map(key => key != 'date' && ` <option value="${key}">${key}</option>`).join('') + '</select>'

        const selectFilter = `
            <select id="condition">
                <option disabled selected>Условие</option>
                <option value="equals">Равно</option>
                <option value="contains">Содержит</option>
                <option value="over">Больше</option>
                <option value="less">Меньше</option>
            </select>
        `
        const input = `<input type="text" id="filter" placeholder="Ввод..." value="">`

        return selectColumn + selectFilter + input
    }

    //Pagination render
    paginationRender() {
        let btns = ""
        for (let page = 1; page <= this.pagiSetup.pages; page++)
            if (page === this.pagiSetup.page)
                btns += `<button value="${page}" class="active">${page}</button>`
            else
                btns += `<button value="${page}">${page}</button>`

        return btns
    }


    // All render
    render(data) {
        if (!this.header) {
            this.renderHeader()
            this.renderBody()
            this.table.innerHTML = `        
                <table class="table">
                    <thead>
                        <tr>
                            ${this.header.join('')}                
                        </tr>
                    </thead>
                
                    <tbody>
                            ${this.body.join('')}                    
                    </tbody>
                </table>   
                

                
                <div class="pagination">
                    ${this.paginationRender()}
                </div>      
                
                <div class="selectors">                
                    ${this.renderFilter()}
                </div>          
            `
        } else {
            this.renderBody(data)
            const tbody = this.table.querySelector('tbody')
            tbody.innerHTML = `<tbody>${this.body.join('')}</tbody>`
        }
        return this
    }

    // Pagination
    pagination(data) {
        const start = (this.pagiSetup.page - 1) * this.pagiSetup.perPage
        const end = start + this.pagiSetup.perPage

        this.pagiSetup.pages = Math.ceil(data.length / this.pagiSetup.perPage)
        const pagiData = data.slice(start, end)
        return pagiData
    }

    //Buttons visible
    paginationBtnsRender() {
        this.pagiSetup.paginationButtons.forEach((btn, i) => {
            btn.classList.remove('active')
            if (i >= this.pagiSetup.pages)
                btn.style.display = 'none'
            else
                btn.style.display = 'inline-block'
        })
    }

    // Test filters
    checkFilter() {
        let filled = true
        Object.keys(this.filter).forEach(key => {
            if (this.filter[key] == "")
                filled = false
        })

        return filled ? true : false

    }


    // filter data fnc
    filtrate() {
        if (!this.checkFilter())
            return

        const filtered = this.data.filter(data => {
            switch (this.filter.condition) {
                case "equals": {
                    if (data[this.filter.column] == this.filter.value)
                        return true
                    else
                        return false
                }
                case "contains": {
                    if (data[this.filter.column].toString().includes(this.filter.value))
                        return true
                    else
                        return false
                }
                case "over": {
                    if (data[this.filter.column] > this.filter.value)
                        return true
                    else
                        return false
                }
                case "less":
                    if (data[this.filter.column] < this.filter.value)
                        return true
                    else
                        return false
            }
        })

        this.render(filtered)
    }

    // Init elemetns
    init() {
        const ths = this.table.querySelectorAll('th')
        const columnSelection = this.table.querySelector('#column')
        const conditionSelection = this.table.querySelector('#condition')
        const filterSelection = this.table.querySelector('#filter')
        this.pagiSetup.paginationButtons = this.table.querySelectorAll('.pagination button')


        ths.forEach(th => th.addEventListener('click', (e) => {

            const column = e.target.dataset.column
            if (column === 'date') // skip date
                return

            const order = e.target.dataset.order
            let text = e.target.textContent.slice(0, -1)

            if (order == 'desc') {
                e.target.dataset.order = 'asc'
                this.data = this.data.sort((a, b) => a[column] > b[column] ? 1 : -1)
                text += '&#8595'
            } else {
                e.target.dataset.order = 'desc'
                this.data = this.data.sort((a, b) => a[column] < b[column] ? 1 : -1)
                text += '&#8593'
            }

            ths.forEach(th => th.innerHTML = th.textContent.slice(0, -1) + '&#8593')

            e.target.innerHTML = text
            this.render()
        }))


        columnSelection.addEventListener('change', (e) => {
            if (e.target.value)
                this.filter.column = e.target.value

            if (e.target.value === 'name') {
                conditionSelection.value = 'contains'
                this.filter.condition = 'contains'
                conditionSelection.disabled = true
            } else {
                this.filter.condition = conditionSelection.value
                conditionSelection.disabled = false
            }

            filterSelection.value = ""
            this.filter.value = ""

            this.render()

        })

        conditionSelection.addEventListener('change', (e) => {

            if (e.target.value)
                this.filter.condition = e.target.value

            this.filtrate()
        })

        filterSelection.addEventListener('input', (e) => {
            if (e.target.value)
                this.filter.value = e.target.value

            if (e.target.value != "")
                this.filtrate()
            else
                this.render()
        })

        this.pagiSetup.paginationButtons.forEach(btn => btn.addEventListener('click', (e) => {
            this.pagiSetup.page = e.target.value
            e.target.classList.add('active')
            this.render()
            this.filtrate()
        }))
    }
}


// Initialize
new Table('#table').render().init()



