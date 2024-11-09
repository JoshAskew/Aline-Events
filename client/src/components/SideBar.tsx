import { useEffect, useState } from 'react';
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
import AuthService from "../utils/auth";

const WeatherSidebar = ({ weatherData }: any) => {

  const buttonVariant = useBreakpointValue({ base: "dropdown", md: "outline" });

 
  const [_error, _setError] = useState<string | null>(null);
  const [_loading, _setLoading] = useState<boolean>(true);
  const [userZip, setUserZip] = useState<string | null>(null);

  useEffect(() => {
    const userProfile = AuthService.getProfile();
    if (userProfile) {
        setUserZip(userProfile.zipCode);
    }

  }, [weatherData])
  
  if (!weatherData || weatherData.length === 0) {
    return (
      <Box>
        <Text>No weather data available.</Text>
      </Box>
    );
  }

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
              Forecasted Weather
            </Heading>
            <VStack align="start">
              <Text fontSize="xl" fontWeight="bold">
                Current Zip Code: <p className='zip'>{userZip}</p>
              </Text>
              <Box borderBottom="1px solid white" width="100%" />
              <Text fontSize="xl" fontWeight="bold">Day: <p className='day'>{weatherData[0].date}</p></Text>
              <Text>Temperature: <p className='temp'>{weatherData[0].temperature} °F </p></Text>
              <Text fontSize="xl" fontWeight="bold">Day: <p className='day'>{weatherData[1].date}</p></Text>
              <Text>Temperature: <p className='temp'>{weatherData[1].temperature} °F </p></Text>
              <Text fontSize="xl" fontWeight="bold">Day: <p className='day'>{weatherData[2].date}</p></Text>
              <Text>Temperature: <p className='temp'>{weatherData[2].temperature} °F </p></Text>
              <Text fontSize="xl" fontWeight="bold">Day: <p className='day'>{weatherData[3].date}</p></Text>
              <Text>Temperature: <p className='temp'>{weatherData[3].temperature} °F </p></Text>
              <Text fontSize="xl" fontWeight="bold">Day: <p className='day'>{weatherData[4].date}</p></Text>
              <Text>Temperature: <p className='temp'>{weatherData[4].temperature} °F </p></Text>
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
