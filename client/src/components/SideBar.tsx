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

  const getBoxShadowColor = (condition: string): string => {
    switch (condition.toLowerCase()) {
      case 'clear sky':
        return '0 4px 10px rgba(255, 165, 0, 0.6)';
      case 'light rain':
        return '0 4px 10px rgba(79, 173, 255, 0.76)';
      case 'moderate rain':
        return '0 4px 10px rgba(35, 35, 232, 1)';
      case 'rain':
        return '0 4px 10px rgba(0, 19, 255, 1)';
      case 'overcast clouds':
        return '0 4px 10px rgba(131, 131, 131, 0.93)';
      case 'scattered clouds':
        return '0 4px 10px rgba(169, 169, 169, 0.6)';
      case 'few clouds':
        return '0 4px 10px rgba(169, 169, 169, 0.3)';
      case 'light snow':
        return '0 4px 10px rgba(255, 255, 255, 0.9)';
      case 'snow':
        return '0 4px 10px rgba(255, 255, 255, 0.7)';
      case 'heavy snowy':
        return '0 4px 10px rgba(0, 0, 255, 1)';
      case 'broken clouds':
        return '0 4px 10px rgba(162, 154, 106, 0.54)';
      default:
        return '0 4px 10px rgba(0, 0, 0, 0.54)';
    }
  };

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
            bg="grey.800"
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
                Current Zip Code: <span className='zip'>{userZip}</span>
              </Text>
              <Box borderBottom="1px solid white" width="100%" />

              {weatherData.map((dayData: any, index: number) => (
                <Box
                  key={index}
                  bg="gray.700"
                  borderRadius="md"
                  padding={4}
                  marginBottom={4}
                  boxShadow={getBoxShadowColor(dayData.condition)}
                  minWidth={'193px'}
                >
                  <Text fontSize="lg" fontWeight="bold">Date: <span className='day'>{dayData.date}</span></Text>
                  <Text>Temperature: <span className='temp'>{dayData.temperature} °F </span></Text>
                  <Text>Conditions: <span className='temp'>{dayData.condition} </span></Text>
                  <img src={dayData.icon} alt={`weather icon for ${dayData.date}`} />
                </Box>
              ))}

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
