const initialProducts = [];
const columnNames = ['Product Name', 'Price', 'Category', 'Image'];


function ProductTableRow(data) {
    const { name, price, category, imageUrl } = data.product;
    return (
        <tr>
            <td>{name || 'NA'}</td>
            <td>${price || 'NA'}</td>
            <td>{category}</td>
            <td><a href={imageUrl} target="_blank">View</a></td>
        </tr>
    );
}


function ProductTable(data) {
    const { headers, products } = data;
    const productTableRows = products.map((product) => <ProductTableRow key={product.id} product={product} />);

    return (
        <table className="table">
            <thead>
                <tr>
                    {headers.map((header, index) => {
                        return <th key={index}>{header}</th>
                    })}
                </tr>
            </thead>

            <tbody>
                {products.length > 0 ? productTableRows : (
                    <tr className="text-center"><td colSpan="4">No Products added yet</td></tr>
                )}
            </tbody>
        </table>
    )
}


class ProductAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            price: '$',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const { name, price, category, imageUrl } = document.forms.productAdd;
        const priceWithoutDollar = price.value.substring(1); // Removing $ sign

        const product = {
            name: name.value,
            price: priceWithoutDollar,
            category: category.value,
            imageUrl: 'images/'+imageUrl.value
        }
        this.props.createProduct(product);

        name.value = '';
        category.value = 'Shirts';
        imageUrl.value = '';
        this.setState({ price: '$' });
    }

    handlePriceChange(event) {
        const priceWithoutDollar = event.target.value.substring(1); // Getting value without '$'
        this.setState({ price: `$${priceWithoutDollar}` })
    }

    render() {
        return (
            <form name="productAdd" onSubmit={this.handleSubmit} className="custom-form">
                <div className="form-element">
                    <label htmlFor="category">Category</label>
                    <select name="category">
                        <option value="Shirts">Shirts</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Jackets">Jackets</option>
                        <option value="Sweaters">Sweaters</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>

                <div className="form-element">
                    <label htmlFor="price">Price Per Unit</label>
                    <input type="text" name="price" value={this.state.price} onChange={this.handlePriceChange} />
                </div>

                <div className="form-element">
                    <label htmlFor="name">Product Name</label>
                    <input type="text" name="name" />
                </div>

                <div className="form-element">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" name="imageUrl" />
                </div>

                <button type="submit" className="button">Add Product</button>
            </form>
        )
    }
}


class ProductList extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
        this.createProduct = this.createProduct.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({ products: initialProducts }); 
    }

    createProduct(product) {
        product.id = this.state.products.length + 1;
        this.setState({ products: [...this.state.products, product] });
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h1>My Company Inventory</h1>
                    <div>Showing all available products</div>
                    <hr />
                    <ProductTable headers={columnNames} products={this.state.products} />
                    <div>Add a new product to inventory</div>
                    <hr />
                    <ProductAdd createProduct={this.createProduct} />
                </div>
            </React.Fragment>
        );
    }
}

const element = (<ProductList />);

ReactDOM.render(element, document.getElementById('content'));
