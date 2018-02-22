import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { TitleSection }     from './components/TitleSection';
import { ContentSection }   from './components/ContentSection';

import '../scss/Drawer.scss';


class Drawer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      back          : false,
      currentStyles : 'drawerMain inital',
      displayView   : 'BasicView'
    };

    this.handleKeys            = _handleKeys.bind(this);
    this.drawerStyles          = _drawerStyles.bind(this);
    this.contentSectionHandler = _contentSectionHandler.bind(this);
    this.titleSectionHandler   = _titleSectionHandler.bind(this);
    this.tabHandler            = _tabHandler.bind(this);
    this.findAndFocus          = _findAndFocus.bind(this);
    this.findFocusables        = _findFocusables.bind(this);
    this.drawerHandler         = props.drawerHandler.bind(this);
  }

  getChildContext() {
    return { basicViewClickHandler: e => this.contentSectionHandler(e) };
  }

  componentWillReceiveProps(nextProps) {

    const { position, drawerOpen } = this.props;

    // this.findFocusables();

    this.drawerStyles(position, drawerOpen);

    if(nextProps.drawerOpen) {
      this.setState({initiatingElement:document.activeElement});
      this.findAndFocus(nextProps.drawerOpen, this.state.initiatingElement, this.state.back);
    }

    if(!nextProps.drawerOpen) {
      this.findAndFocus(nextProps.drawerOpen, this.state.initiatingElement, this.state.back);
    }

  }

  render() {

    const { position, children, drawerOpen, drawerHandler, text, drawerTop } = this.props;
    const { back, currentStyles, displayView } = this.state;

    const hasDrawerTop = drawerTop ? drawerTop : 0;

    return (
      <div role="dialog" style={{top:hasDrawerTop}} aria-hidden={!drawerOpen} tabIndex="0" className={currentStyles} onKeyDown={this.handleKeys}>
        <TitleSection
          back                = {back}
          text                = {text}
          iconClose           = {drawerHandler}
          titleSectionHandler = {this.titleSectionHandler} />
        <ContentSection back={back} displayView={displayView} contentSectionHandler={this.contentSectionHandler}>
          {children}
        </ContentSection>
      </div>
    )
  }

}


export default Drawer;


Drawer.childContextTypes = {
  basicViewClickHandler : PropTypes.func
};


function _handleKeys(e) {
  if(e.which === 27 || e.which === 9) {
    switch(e.which) {
      case 27: this.drawerHandler(); break;   // ---> ESC KEY
      case 9 : this.tabHandler();    break;   // ---> TAB KEY
      default: console.log("events default");
    }
  }
}

function _drawerStyles(position, drawerOpen) {

  let currentStyles;

  switch(position) {
    case "left" : currentStyles = drawerOpen ? "drawerMain left slideOutLeft" : "drawerMain left slideInLeft"; break;
    case "right": currentStyles = drawerOpen ? "drawerMain right slideOutRight" : "drawerMain right slideInRight"; break;
    default: console.log("drawerStyles default case check position on Drawer");
  }

  this.setState({currentStyles});

}

function _contentSectionHandler(e) {

  if(e.currentTarget.attributes['maptodetail']) {
    this.setState({back:true, displayView:e.currentTarget.attributes['maptodetail'].value});
  }

}

function _findAndFocus(drawerOpen, initiatingElement) {
  const focusedElement = drawerOpen ? document.querySelector('.iconWrapper .pe-icon--btn') : initiatingElement;
  focusedElement.focus();
}

function _titleSectionHandler() {
  this.setState({back:false});
}

function _findFocusables() {
  const drawerElement    = document.getElementsByClassName('drawerMain')[0];
  const tabsInsideDrawer = drawerElement.querySelectorAll('button, [tabindex="0"]');
}

function _tabHandler() {

}
