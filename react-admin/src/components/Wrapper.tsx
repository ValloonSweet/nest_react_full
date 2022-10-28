import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from './Menu';
import Nav from './Nav';

type WrapperProps = {
    children: React.ReactElement
}

class Wrapper extends Component<WrapperProps> {

    render() {
        return (
            <div>
                <Nav />
                <div className="container-fluid">
                    <div className="row">
                        <BrowserRouter>
                            <Menu />

                            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                                {this.props.children}
                            </main>
                        </BrowserRouter>
                    </div>
                </div>
            </div>
        );
    }
}

export default Wrapper;
