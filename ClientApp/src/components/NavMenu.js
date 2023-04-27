import React, {Component} from 'react';
import {
    Collapse,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink
} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NavMenu.css';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.state = {
            collapsed: true,
            dropdownOpen: false,
            userData: {},
            isLogin: false,
        };
    }

    componentDidMount() {
        fetch('/api/auth/isLogin', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                if(data) {
                    fetch('/api/users/me', {method: 'GET'})
                        .then(response => response.json())
                        .then(data => {
                            this.setState({userData: data, isLogin: true})
                        })
                }
            })
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const {isLogin} = this.state;
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
                        container light>
                    <Collapse className="d-sm-inline-flex flex-sm-row" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavbarBrand tag={Link} to="/">DistanceLearningSystem</NavbarBrand>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark nav-item-button" to="/courses">Курсы</NavLink>
                            </NavItem>
                        </ul>
                    </Collapse>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>

                    {isLogin ? (
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                            <DropdownToggle caret style={{background: 'none', border: 'none'}}>
                                <img src={this.state.userData.user.avatarUrl}
                                     alt="avatar"
                                     width="40"
                                     height="40"
                                     className="rounded-circle"
                                     style={{border: 'none'}}
                                />
                                <FontAwesomeIcon
                                    icon={this.state.dropdownOpen ? faChevronUp : faChevronDown}
                                    className="text-dark ms-2"
                                />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href={`profile/${this.state.userData.user.userName}`}>Профиль</DropdownItem>
                                <DropdownItem href={`search`}>Пользователи</DropdownItem>
                                <DropdownItem onClick={() => {
                                    fetch('/api/auth/logout', {method: 'POST'})
                                        .then(response => window.location.replace(""))
                                }}>Выйти</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <div>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed}
                                      navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/signin">Вход</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/signup">Регистрация</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </div>
                    )}
                </Navbar>
            </header>
        );
    }
}