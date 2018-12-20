import React, {Component} from 'react';
// import Search from './Search';

export default class MegaMenu extends Component {
  constructor(props) {
    super(props);
    this.handleNav = this.handleNav.bind(this);
    this.handleMenuItem = this.handleMenuItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleMenuItem(href, title) {
    const regex = /(twitter\.com|facebook\.com|addthis\.com|ebay)/;
    const found = href.match(regex);

    return (
      <a
        role='menuitem'
        href={href}
        className={!found || 'external'}
        target={!found || '_blank'}
      >
        {title}
      </a>
    );
  };

  handleChange(e) {
    document.querySelectorAll('.cr-menu__btn').forEach( el => el.checked = false );
    document.getElementById(e.target.id).checked = true;
  }

  // @TODO: Refactor and extract checkbox to separate reusable component
  handleNav(data) {
    const menuItems= Object.keys(data)
      .filter(obj => data[obj]['#title'] !== undefined )
      .sort((a, b) => data[a]['#original_link'].weight - data[b]['#original_link'].weight)
      .map(obj => {
        const level1 = data[obj];
        const menuBar = (
          <div className="cr-menu__block">
            <span />
            {this.handleMenuItem(level1['#href'], level1['#title'])}
          </div>
        );
        const menus = Object.keys(level1['#below'])
          .filter(obj2 => level1['#below'][obj2]['#title'] !== undefined )
          .map(
            obj2 => {
              const level2 = level1['#below'][obj2];
              const menuItem = Object.keys(level2['#below'])
                .filter(obj3 => level2['#below'][obj3]['#title'] !== undefined )
                .sort((a, b) => level2['#below'][a]['#original_link'].weight - level2['#below'][b]['#original_link'].weight)
                .map(
                  obj3 => {
                    const level3 = level2['#below'][obj3];
                    return (
                      <li key={level3['#title']} >
                        {this.handleMenuItem(level3['#href'], level3['#title'])}
                      </li>
                    );
                  }
                );

              return (
                <li key={level2['#title']}>
                  {this.handleMenuItem(level2['#href'], level2['#title'])}
                  <ul>
                    {menuItem}
                  </ul>
                </li>
              );
            }
          );

        return (
          <li key={level1['#title']}>
            {menuBar}
            <ul role="menu">
              {menus}
            </ul>
          </li>
        );
      });

    return (
      <nav className="cr-menu__nav">
        <ul role="menubar" tabIndex="0">
          {menuItems}
        </ul>
      </nav>
    );
  };

  render() {
    const { menu } = this.props;
    return (
      <div className="cr-menu__wrapper">
        <hr className="cr-menu__divider" />
        <div className="cr-menu__inner">
          <div className="cr-menu">
            <input type="checkbox" id="cr-menu__btn--menu" className="cr-menu__btn" onClick={this.handleChange} />
            <label htmlFor="cr-menu__btn--menu" className="cr-menu__label">Menu</label>
            <input type="checkbox" id="cr-menu__btn--search" className="cr-menu__btn" onClick={this.handleChange}/>
            <label htmlFor="cr-menu__btn--search" className="cr-menu__label">Search</label>
            <div className="cr-menu__main-menu">
              {this.handleNav(menu)}
            </div>
            <div className="cr-menu__search">
            </div>
          </div>
        </div>
      </div>
    )
  }
}
