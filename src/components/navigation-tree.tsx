import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { Link } from "gatsby";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import { TaxonomicMenuItem } from "../menu";

import "react-simple-tree-menu/dist/main.css";

interface NavigationTreeProps {
  currentHref: string;
  parentMenuItem?: TaxonomicMenuItem;
}

const NavigationTree: React.FC<NavigationTreeProps> = ({
  currentHref,
  parentMenuItem,
}) => {
  const sectionMenuItem = parentMenuItem?.children.find((item) =>
    currentHref.startsWith(item.href)
  );
  console.log("NavigationTree", {
    currentHref,
    parentMenuItem,
    sectionMenuItem,
  });
  const MenuItem = (item: TaxonomicMenuItem) => {
    const hasChildren = item.children && !!item.children.length;
    return (
      <Card key={item.href}>
        <Card.Header>
          <Link
            to={item.href}
            title={item.hint}
            activeClassName="link-active-page"
          >
            {item.text}
          </Link>
          {hasChildren && (
            <Accordion.Toggle
              eventKey={item.href}
              as={Button}
              variant="link"
              className="float-right p-0"
            >
              <FaAngleRight />
            </Accordion.Toggle>
          )}
        </Card.Header>
        <Accordion.Collapse
          eventKey={hasChildren ? item.href : "x" + item.href}
        >
          <Card.Body>
            {hasChildren && (
              <NavigationTree parentMenuItem={item} currentHref={currentHref} />
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  };
  return (
    (parentMenuItem && (
      <Accordion
        defaultActiveKey={sectionMenuItem ? sectionMenuItem.href : currentHref}
      >
        {parentMenuItem.children.map(MenuItem)}
      </Accordion>
    )) || <></>
  );
};

export default NavigationTree;
