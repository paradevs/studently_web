"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";



// import { updateUser } from "@/lib/actions/user.actions";
 import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}




function PostThread({userId } : {userId: string}) {

    const router = useRouter();
    const pathname = usePathname();
   
  
    const form = useForm({
      resolver: zodResolver(ThreadValidation),
      defaultValues: {
        thread: '',
        accountId: userId,
      },
    });

    const onSubmit = async (values : z.infer<typeof ThreadValidation>) => {
            await createThread({
                    text: values.thread,
                    author: userId,
                    communityId: null,
                    path: pathname
                });

                router.push("/")
    }


    return (

        <Form {...form}>
            <form
                className='mt-10 flex flex-col justify-start gap-10'
                onSubmit={form.handleSubmit(onSubmit)}
            >

                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3 '>
                            <FormLabel className='text-base-semibold text-light-2'>
                                How are you feeling today? 
                            </FormLabel>
                            <FormControl  className="no-focus border account-form_input shadow-">
                                <Textarea
                                    rows={15}
                                    placeholder="Write a Post..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-primary-500 rounded-3xl  text-light-1 hover:text-dark-1 shadow-sm">
                    Post Thread
                </Button>

            </form>
        </Form>


    )
}

export default PostThread;
