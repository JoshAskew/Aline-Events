import { Button } from "../components/ui/button";
import {
  DrawerActionTrigger,
  DrawerRoot,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Box, Text, VStack, Heading, useBreakpointValue } from "@chakra-ui/react";
import "./SideBar.css";

const WeatherSidebar = () => {
  // Use Chakra's useBreakpointValue to switch button style based on screen size
  const buttonVariant = useBreakpointValue({ base: "dropdown", md: "outline" });

  return (
    <DrawerRoot>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button
          className="check-weather"
         
          size="sm"
          position="absolute"
          right={0}
          top={20}
          margin="20px"
          cursor="pointer"
        >
          {buttonVariant === "dropdown" ? "☀️" : "Check Weather☀️"}
        </Button>
      </DrawerTrigger>
      <DrawerContent width="300px" maxWidth="100%">
        <DrawerHeader>
          <DrawerTitle>Weather Information</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Box
            bg="gray.800"
            color="white"
            borderRadius="md"
            padding={6}
            boxShadow="lg"
          >
            <Heading size="lg" mb={4} textAlign="center">
              Current Weather
            </Heading>
            <VStack align="start">
              <Text fontSize="xl" fontWeight="bold">
                Location: Minneapolis, MN
              </Text>
              <Box borderBottom="1px solid white" width="100%" />
              <Text fontSize="lg">Temperature: 72°F</Text>
              <Text fontSize="lg">Condition: Sunny</Text>
              <Text fontSize="lg">Humidity: 55%</Text>
              <Text fontSize="lg">Wind: 10 mph</Text>
              <Box borderBottom="1px solid white" width="100%" />
              <Text fontSize="sm" color="gray.300" mt={2}>
                Updated: Just now
              </Text>
            </VStack>
          </Box>
          <Box
            bg="gray.800"
            color="white"
            borderRadius="md"
            padding={6}
            boxShadow="lg"
          >
            <Heading size="lg" mb={4} textAlign="center">
              Forecasted Weather
            </Heading>
            <VStack align="start">
              <Text fontSize="xl" fontWeight="bold">
                Location: Minneapolis, MN
              </Text>
              <Box borderBottom="1px solid white" width="100%" />
              <Text fontSize="lg">Monday</Text>
              <Text fontSize="lg">Tuesday</Text>
              <Text fontSize="lg">Wednesday</Text>
              <Text fontSize="lg">Thursday</Text>
              <Text fontSize="lg">Friday</Text>
              <Text fontSize="lg">Saturday</Text>
              <Text fontSize="lg">Sunday</Text>
              <Box borderBottom="1px solid white" width="100%" />
              <Text fontSize="sm" color="gray.300" mt={2}>
                Updated: Just now
              </Text>
            </VStack>
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Close</Button>
          </DrawerActionTrigger>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default WeatherSidebar;
