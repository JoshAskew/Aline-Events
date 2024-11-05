import { Button, Card, Image, Text } from "@chakra-ui/react"
import './Home.css'
import Aline from "../images/aline.webp"

const Home = () => {
    return (
        <>
                <h1 className="header">Aline</h1>
            <div className="cards-container">
                <Card.Root className="card" maxW="sm" overflow="hidden">
                    <Image
                        src= {Aline}
                    />
                    <Card.Body gap="2">
                        <Card.Title>Event Title</Card.Title>
                        <Card.Description>
                            This is the type of the event.
                        </Card.Description>
                        <Card.Description>
                            Start Date-End Date
                        </Card.Description>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            $450-$1000
                        </Text>
                    </Card.Body>
                    <Card.Footer gap="2">
                        <Button variant="solid">Save Event</Button>
                        <Button variant="ghost">Skip Event</Button>
                    </Card.Footer>
                </Card.Root>

                <Card.Root className="card" maxW="sm" overflow="hidden">
                    <Image
                        src={Aline}
                    />
                    <Card.Body gap="2">
                        <Card.Title>Event Title</Card.Title>
                        <Card.Description>
                            This is the type of the event.
                        </Card.Description>
                        <Card.Description>
                            Start Date-End Date
                        </Card.Description>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            $450-$1000
                        </Text>
                    </Card.Body>
                    <Card.Footer gap="2">
                        <Button variant="solid">Save Event</Button>
                        <Button variant="ghost">Skip Event</Button>
                    </Card.Footer>
                </Card.Root>

                <Card.Root className="card" maxW="sm" overflow="hidden">
                    <Image
                        src={Aline}
                    />
                    <Card.Body gap="2">
                        <Card.Title>Event Title</Card.Title>
                        <Card.Description>
                            This is the type of the event.
                        </Card.Description>
                        <Card.Description>
                            Start Date-End Date
                        </Card.Description>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            $450-$1000
                        </Text>
                    </Card.Body>
                    <Card.Footer gap="2">
                        <Button variant="solid">Save Event</Button>
                        <Button variant="ghost">Skip Event</Button>
                    </Card.Footer>
                </Card.Root>

                <Card.Root className="card" maxW="sm" overflow="hidden">
                    <Image
                        src={Aline}
                    />
                    <Card.Body gap="2">
                        <Card.Title>Event Title</Card.Title>
                        <Card.Description>
                            This is the type of the event.
                        </Card.Description>
                        <Card.Description>
                            Start Date-End Date
                        </Card.Description>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            $450-$1000
                        </Text>
                    </Card.Body>
                    <Card.Footer gap="2">
                        <Button variant="solid">Save Event</Button>
                        <Button variant="ghost">Skip Event</Button>
                    </Card.Footer>
                </Card.Root>

                <Card.Root className="card" maxW="sm" overflow="hidden">
                    <Image
                        src={Aline}
                    />
                    <Card.Body gap="2">
                        <Card.Title>Event Title</Card.Title>
                        <Card.Description>
                            This is the type of the event.
                        </Card.Description>
                        <Card.Description>
                            Start Date-End Date
                        </Card.Description>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            $450-$1000
                        </Text>
                    </Card.Body>
                    <Card.Footer gap="2">
                        <Button variant="solid">Save Event</Button>
                        <Button variant="ghost">Skip Event</Button>
                    </Card.Footer>
                </Card.Root>

                <Card.Root className="card" maxW="sm" overflow="hidden">
                    <Image
                        src={Aline}
                    />
                    <Card.Body gap="2">
                        <Card.Title>Event Title</Card.Title>
                        <Card.Description>
                            This is the type of the event.
                        </Card.Description>
                        <Card.Description>
                            Start Date-End Date
                        </Card.Description>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            $450-$1000
                        </Text>
                    </Card.Body>
                    <Card.Footer gap="2">
                        <Button variant="solid">Save Event</Button>
                        <Button variant="ghost">Skip Event</Button>
                    </Card.Footer>
                </Card.Root>
            </div>
        </>
    );
};

export default Home;