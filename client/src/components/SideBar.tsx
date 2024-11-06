import { Button } from "../components/ui/button";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Box, Text, VStack, Heading } from "@chakra-ui/react";

const WeatherSidebar = () => {
  return (
    <DrawerRoot>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button  variant="outline" size="sm"
        position="absolute"
        right={0}
        top={0}
        margin="20px"
        cursor="pointer"
        >
          Check Weather☀️
        </Button>
      </DrawerTrigger>
      <DrawerContent width="300px" maxWidth="100%">
        <DrawerHeader>
          <DrawerTitle fontFamily= "">Weather Information</DrawerTitle>
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
