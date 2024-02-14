import {Button} from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {IoSparkles} from 'react-icons/io5';

const AddProject = () => {
  return (
    <>
      <Drawer>
        <DrawerTrigger className="w-full max-w-[500px]">
          <div className="px-8 gap-2 w-full flex text-white  justify-center items-center font-[500] py-4 text-sm border rounded-md shadow-lg  bg-gradient-to-br border-white/30 from-accent_1 to-accent_2">
            <IoSparkles className="w-6 h-6 text-white" />
            <div>Deploy an App</div>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddProject;
