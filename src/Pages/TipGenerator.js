import { Center, Icon, Button, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import { GrFormRefresh } from "react-icons/gr";

function TipGenerator() {
  const [randomTip, setRandomTip] = useState(
    Math.floor(Math.random() * tips.length)
  );

  const randomIndex = Math.floor(Math.random() * tips.length);
  const tip = tips[randomIndex];

  return (
    <>
      <Center
        bg="gray.50"
        p={4}
        color="black"
        border="1px"
        borderColor="black"
        width="35%"
        mx="auto"
      >
        {tip}
        <Spacer />
        <Button
          bg="gray.300"
          variant="solid"
          ml="12px"
          height="25px"
          width="50px"
          onClick={() => setRandomTip(randomIndex)}
        >
          <Icon as={GrFormRefresh} />
        </Button>
      </Center>
    </>
  );
}

const tips = [
  "Create a budget",
  "Track your expenses",
  "Cook at home",
  "Make a grocery list before shopping",
  "Buy generic brands",
  "Use coupons",
  "Cancel unnecessary subscriptions",
  "Cut down on eating out",
  "Pack your lunch",
  "Use public transportation",
  "Carpool or ride-share",
  "Avoid impulse purchases",
  "Compare prices before making purchases",
  "Negotiate prices",
  "Buy in bulk",
  "Shop during sales",
  "Use cashback and rewards programs",
  "Quit smoking",
  "Cut down on alcohol consumption",
  "Reduce energy usage",
  "Use energy-efficient appliances",
  "Cancel unused memberships or subscriptions",
  "DIY home repairs",
  "Borrow books from the library",
  "Rent movies instead of going to the theater",
  "Shop for clothes during clearance sales",
  "Buy second-hand items",
  "Repair instead of replacing",
  "Use free or low-cost entertainment options",
  "Cut down on coffee shop purchases",
  "Use a programmable thermostat",
  "Buy refurbished electronics",
  "Use free online resources for learning",
  "Cancel unused gym memberships",
  "Use free exercise apps or videos",
  "Pay bills on time to avoid late fees",
  "Reduce water usage",
  "Use reusable water bottles",
  "Cut down on expensive hobbies",
  "Negotiate your insurance premiums",
  "Avoid unnecessary bank fees",
  "Use a prepaid cell phone plan",
  "Cancel cable or satellite TV",
  "Use free budgeting apps",
  "Cancel unnecessary home services",
  "Use homemade cleaning products",
  "Buy used cars instead of new",
  "Repair clothing instead of buying new",
  "Cancel unused landline phone services",
  "Shop at thrift stores",
  "Cancel unnecessary credit cards",
  "Use a programmable coffee maker",
  "Buy discounted gift cards",
  "Use a clothesline instead of a dryer",
  "Cancel unnecessary warranties",
  "Make your own gifts",
  "Do your own yard work",
  "Cancel unnecessary streaming services",
  "Cut down on beauty salon visits",
  "Make your own coffee",
  "Use public Wi-Fi instead of using mobile data",
  "Buy non-perishable items in bulk",
  "Boil water instead of buying",
  "Cancel unnecessary storage units",
  "Use natural light instead of turning on lights",
  "Rent out a spare room or parking space",
  "Cancel unnecessary credit monitoring services",
  "Use a slow cooker for inexpensive meals",
  "Participate in clothing swaps",
  "Use a library for printing and copying",
  "Cancel unnecessary magazine subscriptions",
  "Shop for used furniture",
  "Use rechargeable batteries",
  "Cancel unnecessary home security services",
  "Reduce food waste",
  "Use free tax preparation services",
  "Cancel unnecessary online streaming subscriptions",
  "Buy discounted or expired produce for cooking",
  "Use a fan instead of air conditioning",
  "Cancel unnecessary subscriptions",
  "Buy in-season fruits and vegetables",
  "Use a drying rack instead of a dryer",
  "Cancel unnecessary pet services",
  "DIY your own home decor",
  "Use free online resources for workouts",
  "Cancel unnecessary professional memberships",
  "Cancel unnecessary extended warranties",
  "Use public parks and recreational areas for exercise",
  "Buy used textbooks or rent them",
  "Cancel unnecessary app subscriptions",
  "Cancel unnecessary cloud storage subscriptions",
  "Use free online tools for productivity",
  "Cancel unnecessary music streaming services",
  "Use a reusable shopping bag",
  "Cancel unnecessary meal kit subscriptions",
  "Reduce food delivery expenses",
  "Cut down on alcoholic beverages and sugary drinks",
  "Use free online resources for entertainment",
  "Cancel unnecessary fitness class memberships",
];

export default TipGenerator;
