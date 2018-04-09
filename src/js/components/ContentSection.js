import React from 'react';

export const ContentSection = ({ children, back, displayView, skipTo }) => {

  const sectionAnimation = back ? "contentSection slideInRightContent" : "contentSection slideOutLeftContent";
  const stepKids         = React.Children.map(children.props.children, child => child);
  const findBasicViews   = stepKids.filter(c => c.props.myKind.toLowerCase() === "basicview");
  const findDetailViews  = stepKids.filter(c => c.props.myKind.toLowerCase() === "detailview");
  const findDetailView   = findDetailViews.filter(c => c.props.id === displayView);

  return (
    <ul className={sectionAnimation}>
      {!back && findBasicViews}
      { back && (skipTo ? findBasicViews : findDetailView)}
    </ul>
  )
}
