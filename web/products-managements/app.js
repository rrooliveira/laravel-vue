new Vue({
    el: '#app',
    data: {
        products: [
            {
                "id": 1,
                "name": "Intelligent Granite Table",
                "category": "Tools",
                "price": "787.00"
            },
            {
                "id": 2,
                "name": "Handcrafted Rubber Hat",
                "category": "Games",
                "price": "232.00"
            },
            {
                "id": 3,
                "name": "Rustic Concrete Salad",
                "category": "Jewelery",
                "price": "115.00"
            },
            {
                "id": 4,
                "name": "Gorgeous Concrete Pizza",
                "category": "Garden",
                "price": "250.00"
            },
            {
                "id": 5,
                "name": "Refined Plastic Shoes",
                "category": "Health",
                "price": "844.00"
            },
            {
                "id": 6,
                "name": "Awesome Metal Soap",
                "category": "Tools",
                "price": "326.00"
            },
            {
                "id": 7,
                "name": "Intelligent Fresh Mouse",
                "category": "Home",
                "price": "783.00"
            },
            {
                "id": 8,
                "name": "Licensed Soft Keyboard",
                "category": "Music",
                "price": "361.00"
            },
            {
                "id": 9,
                "name": "Fantastic Rubber Pants",
                "category": "Garden",
                "price": "786.00"
            },
            {
                "id": 10,
                "name": "Awesome Rubber Ball",
                "category": "Automotive",
                "price": "696.00"
            },
            {
                "id": 11,
                "name": "Handcrafted Soft Pizza",
                "category": "Health",
                "price": "31.00"
            },
            {
                "id": 12,
                "name": "Practical Soft Chips",
                "category": "Computers",
                "price": "795.00"
            },
            {
                "id": 13,
                "name": "Practical Frozen Shirt",
                "category": "Kids",
                "price": "879.00"
            },
            {
                "id": 14,
                "name": "Unbranded Plastic Car",
                "category": "Toys",
                "price": "454.00"
            },
            {
                "id": 15,
                "name": "Handcrafted Plastic Table",
                "category": "Shoes",
                "price": "189.00"
            },
            {
                "id": 16,
                "name": "Intelligent Plastic Car",
                "category": "Grocery",
                "price": "202.00"
            },
            {
                "id": 17,
                "name": "Ergonomic Wooden Pizza",
                "category": "Electronics",
                "price": "801.00"
            },
            {
                "id": 18,
                "name": "Refined Rubber Pants",
                "category": "Home",
                "price": "580.00"
            },
            {
                "id": 19,
                "name": "Small Frozen Hat",
                "category": "Music",
                "price": "654.00"
            },
            {
                "id": 20,
                "name": "Unbranded Cotton Chips",
                "category": "Tools",
                "price": "305.00"
            },
            {
                "id": 21,
                "name": "Unbranded Plastic Chicken",
                "category": "Baby",
                "price": "943.00"
            },
            {
                "id": 22,
                "name": "Rustic Fresh Pizza",
                "category": "Toys",
                "price": "647.00"
            },
            {
                "id": 23,
                "name": "Ergonomic Metal Tuna",
                "category": "Industrial",
                "price": "51.00"
            },
            {
                "id": 24,
                "name": "Unbranded Frozen Chicken",
                "category": "Movies",
                "price": "248.00"
            },
            {
                "id": 25,
                "name": "Ergonomic Cotton Table",
                "category": "Baby",
                "price": "4.00"
            },
            {
                "id": 26,
                "name": "Handmade Frozen Pants",
                "category": "Home",
                "price": "731.00"
            },
            {
                "id": 27,
                "name": "Rustic Cotton Bike",
                "category": "Jewelery",
                "price": "161.00"
            },
            {
                "id": 28,
                "name": "Licensed Metal Bacon",
                "category": "Books",
                "price": "331.00"
            },
            {
                "id": 29,
                "name": "Practical Cotton Soap",
                "category": "Books",
                "price": "861.00"
            },
            {
                "id": 30,
                "name": "Sleek Frozen Tuna",
                "category": "Electronics",
                "price": "375.00"
            }
        ],
        order: {
            direction: 1,
            column: 'price',
        },
        filters: {
            name: '',
            keywords: ''
        },
        isSearching: false,
        perPage: 10,
        currentPage: 1,
        product: {
            id: null,
            name: null,
            category: null,
            price: null
        },
        isEdit: false

    },
    computed: {
        productsSorted() {
            return this.productsFiltered.sort((a, b) => {
                let left = a[this.order.column];
                let right = b[this.order.column];

                if (isNaN(left) && isNaN(right)) {
                    if (left < right) {
                        return -1 * this.order.direction;
                    } else if (left > right) {
                        return this.order.direction;
                    } else {
                        return 0;
                    }
                } else {
                    return (left - right) * this.order.direction;
                }
            });
        },

        sortType() {
            return this.order.direction === 1 ? 'ascending' : 'descending';
        },

        whenSearching() {
            return this.filters.name.length > 0
        },

        productsFiltered() {
            let products = this.products;

            if (this.filters.name) {
                let findName = new RegExp(this.filters.name, "i");
                products = products.filter(product => product.name.match(findName));
            }

            return products;
        },

        keywordsIsInvalid() {
            return this.filters.keywords.length < 3;
        },

        productsPaginated() {
            let start = (this.currentPage - 1) * this.perPage;
            let end = this.currentPage * this.perPage;

            return this.productsSorted.slice(start, end);
        },

        isFirstPage() {
            return this.currentPage === 1;
        },

        isLastPage() {
            return this.currentPage >= this.pages;
        },

        pages() {
            return Math.ceil(this.productsFiltered.length / this.perPage);
        },

        categories() {
            let products = this.products.map(product => product.category);

            return Array.from(new Set(products.sort()));
        },

        modalTitle() {
            return this.isEdit ? "Update Product" : "Add New Product"
        },

        modalTextButton() {
            return this.isEdit ? "Update": "Save";
        }
    },
    methods: {
        cleanProduct() {
            this.product = {
                id: null,
                name: null,
                category: null,
                price: null
            }
        },

        classes(column) {
            return [
                'sort-control',
                column === this.order.column ? this.sortType : ''
            ]
        },

        sort(column) {
            this.order.column = column;
            this.order.direction *= -1;
        },

        clearText() {
            this.filters.name = this.filters.keywords = '';
            this.isSearching = false;
        },

        search() {
            if (!this.keywordsIsInvalid) {
                this.filters.name = this.filters.keywords;
                this.isSearching = true;
            }
        },

        prev() {
            if(!this.isFirstPage) {
                this.currentPage--;
            }
        },

        next () {
            if(!this.isLastPage) {
                this.currentPage++;
            }
        },

        switchPage(page) {
            this.currentPage = page;
        },

        saveOrUpdate() {
            if (this.isEdit) {
                this.update();
            } else {
                this.save()
            }
        },

        save() {
            if (this.product.name && this.product.category && this.product.price) {
                this.product.id = this.products.length + 1;

                this.products.unshift(this.product);

                this.cleanProduct()

                $(this.$refs.vueModal).modal('hide');
            } else {
                alert("Please fill in the form properly.");
            }
        },

        add() {
            this.isEdit = false

            this.cleanProduct();

            $(this.$refs.vueModal).modal('show');
        },

        edit(product) {
            this.isEdit = true
            this.product = Object.assign({}, product);

            $(this.$refs.vueModal).modal('show');
        },

        update() {
            let index = this.products.findIndex(item => item.id === this.product.id);

            this.products.splice(index, 1, this.product);

            this.isEdit = false;

            $(this.$refs.vueModal).modal('hide');
        },

        remove(product) {
            if (confirm("Are you sure?")) {
                this.products = this.products.filter((element) => element.id !== product.id);
            }
        }
    }
})
