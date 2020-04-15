import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios.orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        //console.log('[componentDidMount] '+this.props.token)
        
        const queryParams = "?auth=" + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId+ '"';
        console.log(queryParams);
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });
            }).catch(err => {
                this.setState({ loading: false });
                console.log(err);
            });

    }

    render() {
       // console.log(this.props.token);
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.login.auth.token,
        userId: state.login.auth.userId
    }
}
export default connect(mapStateToProps) (withErrorHandler(Orders, axios));