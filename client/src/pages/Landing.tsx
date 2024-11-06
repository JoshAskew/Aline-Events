import { Box, Heading, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";
import "./Landing.css";

const LandingPage = () => {
    return (
        <div className="landing-wrapper">
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            minHeight="100vh" 
            bgGradient="linear(to-r, gray.50, teal.100)"
            p={4}
        >
            <VStack textAlign="center">
                <Heading className="landing-header" as="h1" size="2xl" color="teal.600">
                    Welcome to Aline
                </Heading>
                <Text fontSize="xl" color="gray.600" maxWidth="600px">
                    Discover events, explore, and never miss out on what's happening around you!
                </Text>
                <HStack  mt={4}>
                    <Link to="/login">
                        <Button 
                            size="lg" 
                            colorScheme="teal" 
                            variant="solid" 
                        >
                            Login <RiArrowRightLine />
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button 
                            size="lg" 
                            colorScheme="teal" 
                            variant="outline"
                        >
                            Sign Up
                        </Button>
                    </Link>
                </HStack>
            </VStack>
        </Box>
        </div>
    );
};

export default LandingPage;