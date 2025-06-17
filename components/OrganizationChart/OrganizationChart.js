import React, { useRef, useLayoutEffect, useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import * as d3 from "d3";
import PropTypes from "prop-types";
import { OrgChart } from "d3-org-chart";
import CustomNodeContent from "./CustomNodeContent";
import CustomExpandButton from "./CustomExpandButton";
import { CSS_SELECTOR, ATTRIBUTES } from "./constants";
import { appendHandler } from "./utils";

const OrganizationalChart = (props) => {
  const {chartRef, onAddNewUserHandler, onViewUserHandler, onPositionClickHandler, onDepartmentClickHandler, onUserProfileHandler, hasEditPerms } = props;
  const d3Container = useRef(null);

  const addChartEventListeners = useCallback(() => {
    if (chartRef.current) {
      appendHandler(d3Container.current, CSS_SELECTOR.ADD_ICON, ATTRIBUTES.ID, onAddNewUserHandler);
      appendHandler(
        d3Container.current,
        CSS_SELECTOR.TEAM_ICON,
        ATTRIBUTES.ID,
        onUserProfileHandler
      );
      appendHandler(d3Container.current, CSS_SELECTOR.VIEW_ALL, ATTRIBUTES.ID, onViewUserHandler);
      appendHandler(d3Container.current, CSS_SELECTOR.POSITION_CONTAINER, ATTRIBUTES.ID, onPositionClickHandler);
      appendHandler(d3Container.current, CSS_SELECTOR.DEPARTMENT_CONTAINER, ATTRIBUTES.ID, onDepartmentClickHandler);
    }
  }, [onPositionClickHandler, onAddNewUserHandler, onViewUserHandler, onUserProfileHandler, onDepartmentClickHandler]);

  const expandOrCollapseHandler = useCallback(
    (node) => {
      addChartEventListeners();
    },
    [addChartEventListeners]
  );

  useLayoutEffect(() => {
    const chart = new OrgChart();
    chartRef.current = chart;
    chart.layout("top");
    if (props.data && d3Container.current) {
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeWidth((d) => 330)
        .nodeHeight((d) => 140)
        .compactMarginBetween((d) => 80)
        .buttonContent((node, state) => {
          return ReactDOMServer.renderToStaticMarkup(<CustomExpandButton {...node.node} />);
        })
        .nodeContent((d) => {
          return ReactDOMServer.renderToStaticMarkup(<CustomNodeContent {...d} hasEditPerms={hasEditPerms} />);
        })
        .onExpandOrCollapse(expandOrCollapseHandler)
        .render();

      setTimeout(() => addChartEventListeners(), 0);
    }
  }, [props, props.data, addChartEventListeners, expandOrCollapseHandler]);

  return <div className="org-chart" ref={d3Container} />;
};

OrganizationalChart.propTypes = {
  chartRef: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object),
  onAddNewUserHandler: PropTypes.func,
  onPositionClickHandler: PropTypes.func,
  onViewUserHandler: PropTypes.func,
  onUserProfileHandler: PropTypes.func,
  onDepartmentClickHandler: PropTypes.func,
  hasEditPerms: PropTypes.bool,
};

OrganizationalChart.defaultProps = {
  data: [],
};

export default React.memo(OrganizationalChart);
