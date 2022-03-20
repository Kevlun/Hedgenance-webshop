import React, { useEffect, useState } from "react";
import { userState } from "../stores/auth/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { holdingState } from "../stores/holdings/atom";
import {
  holdingStatus,
  categoryHoldingStatus,
  productHoldingStatus,
} from "../stores/holdings/selector";

import {
  Box,
  Text,
  Container,
  SimpleGrid,
  Center,
  Button,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
} from "@chakra-ui/react";
import { MdBuild } from "react-icons/md";
import { GiHedgehog } from "react-icons/gi";
import { fundingStatus } from "../stores/fundings/selector";

import LocalNav from "../components/LocalNav";

import { PieChart, Pie, Label, ResponsiveContainer } from "recharts";

function MyAccount() {
  const user = useRecoilValue(userState);
  const [holdings, setHoldings] = useRecoilState(holdingState);
  const { totalHolding } = useRecoilValue(holdingStatus);
  console.log(`User: ${user}`);
  console.log(holdings);
  const { totalFunds } = useRecoilValue(fundingStatus);

  const { categoryStore } = useRecoilValue(categoryHoldingStatus);

  const { productStore } = useRecoilValue(productHoldingStatus);

  const pieData = categoryStore.map((holding) => {
    return {
      category: holding.category,
      value: holding.value,
    };
  });

  const handleHoldings = () => {
    setHoldings([]);
  };

  return (
    <Box minH="100vh">
      <LocalNav />
      <Center>
        <Container
          color="var(--chakra-colors-gray-300)"
          maxW="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            gap={2}
          >
            <Text fontSize="3xl">Hey hog: {user}</Text>
            <GiHedgehog size={50} />
          </Box>
          <StatGroup
            color="var(--chakra-colors-gray-300)"
            // alignSelf="flex-end"
          >
            <Stat spacing={2}>
              <StatHelpText fontSize="xl">
                Period: 3m
                <StatArrow type="increase" color="green" />
                13.36%
              </StatHelpText>
            </Stat>
          </StatGroup>
          <Center>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              pb={4}
            >
              {" "}
              <Text fontSize="3xl" color="white">
                Total value: ${(totalHolding + totalFunds).toLocaleString()}
              </Text>
              <Text fontSize="2xl" alignSelf="flex-end">
                Available funds: {totalFunds.toLocaleString()}
              </Text>
              <Text fontSize="2xl" alignSelf="flex-end">
                Hedge value: {totalHolding.toLocaleString()}
              </Text>
            </Box>
          </Center>
          <ResponsiveContainer width="100%" height={500}>
            <PieChart height={500}>
              <Pie
                data={pieData}
                dataKey="value"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  category,
                }) => {
                  console.log("handling label?");
                  const RADIAN = Math.PI / 180;
                  // eslint-disable-next-line
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  // eslint-disable-next-line
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  // eslint-disable-next-line
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#8884d8"
                      // fontSize="16px"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {category}, ${value}
                    </text>
                  );
                }}
                fill="none"
              >
                <Label
                  // angle={270}
                  position="insideLeft"
                  offset={10}
                  value="Hedges by Cat."
                  style={{
                    textAnchor: "middle",
                    // fontSize: "150%",
                    fill: "var(--chakra-colors-gray-300)",
                  }}
                ></Label>
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <SimpleGrid
            templateColumns={{
              base: "1fr 1fr",
              sm: "1fr 1fr 1fr",
              md: "1fr 1fr 1fr 1fr",
            }}
            spacing={8}
            py={2}
          >
            {productStore &&
              productStore.map((holding) => (
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={1}
                  border="1px white solid"
                  borderRadius="12px"
                  width="100%"
                  key={holding.id}
                  alignItems="flex-start"
                  p={2}
                >
                  <Text fontSize="1xl" fontWeight="bold"></Text>
                  <Text fontWeight="bold">{holding.title}</Text>
                  <Text>Amont: {holding.amount.toLocaleString()}</Text>
                  <Text>Value: {holding.value.toLocaleString()}</Text>
                </Box>
              ))}
          </SimpleGrid>
        </Container>
      </Center>
    </Box>
  );
}

export default MyAccount;
