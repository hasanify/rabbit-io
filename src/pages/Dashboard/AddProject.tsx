import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import useAPI from "@/hooks/useAPI";
import {useState} from "react";
import {IoSparkles} from "react-icons/io5";

const AddProject = () => {
  const [url, setUrl] = useState("");
  const {addProject} = useAPI();
  const deploy = () => {
    try {
      addProject({git_url: url});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="px-8 active:scale-[0.98] hover:shadow-lg hover:shadow-black/30 hover:scale-[1.02] duration-200 transition-all mb-4 gap-2 sm:max-w-80 w-full flex text-white  justify-center items-center font-[500] py-4 text-sm border rounded-md shadow-lg  bg-gradient-to-br border-white/30 from-accent_1 to-accent_2">
        <IoSparkles className="w-6 h-6 text-white" />
        <div>Deploy an App</div>
      </DialogTrigger>
      <DialogContent>
        <Card className="w-full border-none">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid items-center w-full gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="git_url">Github URL</Label>
                  <Input
                    value={url}
                    onChange={e => {
                      e.preventDefault();
                      setUrl(e.currentTarget.value);
                    }}
                    id="git_url"
                    placeholder="Github URL for your project"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button onClick={deploy}>Deploy</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
