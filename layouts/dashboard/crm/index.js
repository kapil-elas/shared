/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.3
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import {
  SoftBox,
  SoftTypography,
  MiniGradientLineChart,
  PlaceholderCard,
  BackgroundBlogCard,
  CategoriesList,
  MessageCard,
  RankingsList,
  Calendar
} from "./../../../components";

// Data
import miniGradientLineChartData from "./data/miniGradientLineChartData";
import categoriesListData from "./data/categoriesListData";
import rankingsListData from "./data/rankingsListData";
import calendarEventsData from "./data/calendarEventsData";

// Images
import ivancik from "./../../../assets/images/ivancik.jpg";
import kalVisualsSquare from "./../../../assets/images/kal-visuals-square.jpg";

function CRM() {
  const { visitorsChart, incomeChart } = miniGradientLineChartData;
  const { transactionsData, revenueData } = rankingsListData;

  return (
      <SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7} xl={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <MiniGradientLineChart
                    title="visitors"
                    description={
                      <SoftTypography variant="h5" fontWeight="bold">
                        5,927{" "}
                        <SoftTypography variant="button" color="success" fontWeight="bold">
                          +55%
                        </SoftTypography>
                      </SoftTypography>
                    }
                    chart={visitorsChart}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MiniGradientLineChart
                    title="income"
                    description={
                      <SoftTypography variant="h5" fontWeight="bold">
                        $130,832{" "}
                        <SoftTypography variant="button" color="success" fontWeight="bold">
                          +90%
                        </SoftTypography>
                      </SoftTypography>
                    }
                    chart={incomeChart}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <PlaceholderCard title={{ variant: "h6", text: "New tab" }} hasBorder />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <SoftBox mt={3}>
                  {useMemo(
                    () => (
                      <Calendar
                        header={{ title: "calendar", date: "Monday, 2021" }}
                        headerToolbar={false}
                        initialView="dayGridMonth"
                        initialDate="2021-08-10"
                        events={calendarEventsData}
                        selectable
                        editable
                      />
                    ),
                    [calendarEventsData]
                  )}
                </SoftBox>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={5} xl={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <BackgroundBlogCard
                    image={ivancik}
                    title="hey john!"
                    description={
                      <>
                        Wealth creation is an evolutionarily recent <br />
                        positive-sum game. It is all about who take the opportunity first.
                      </>
                    }
                    buttonText="read more"
                    action={{ type: "internal", route: "/dashboards/crm", label: "read more" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={12}>
                  <CategoriesList title="categories" categories={categoriesListData} />
                </Grid>
                <Grid item xs={12} sm={6} lg={12}>
                  <MessageCard
                    image={kalVisualsSquare}
                    text="Today is Martina's birthday. Wish her the best of luck!"
                    button={{ color: "dark", text: "send message" }}
                    action={{
                      type: "internal",
                      route: "/dashboards/crm",
                      color: "dark",
                      label: "send message",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <RankingsList
              title="transactions"
              date="23 - 30 March 2021"
              rankings={transactionsData}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RankingsList title="revenue" date="01 - 07 June 2021" rankings={revenueData} />
          </Grid>
        </Grid>
      </SoftBox>
  );
}

export default CRM;
