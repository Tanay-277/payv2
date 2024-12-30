import { Button } from "@pay/ui/button";
import { Input } from "@pay/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@pay/ui/card"
import { Label } from "@pay/ui/label";

export default async function Home() {

  return (
    <>
      <h1 className="text-9xl text-red-500 bg-red-100">Hello</h1>
      <Button size={"lg"}>Pay</Button>
      <Label htmlFor="hello">Hello</Label>
      <Input type="text" placeholder="Hello" />
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  )
}