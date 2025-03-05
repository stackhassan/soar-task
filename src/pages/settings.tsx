import { Layout } from "@/components/layout/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/userSlice";
import { useToast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores"
    ),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  presentAddress: z
    .string()
    .min(5, "Present address must be at least 5 characters"),
  permanentAddress: z
    .string()
    .min(5, "Permanent address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  postalCode: z
    .string()
    .min(5, "Postal code must be at least 5 characters")
    .regex(/^[0-9]+$/, "Postal code must contain only numbers"),
  country: z.string().min(2, "Country must be at least 2 characters"),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function Settings() {
  const { data: user, isLoading } = useUser();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateUser({ avatar: reader.result as string }));
        toast({
          title: "Avatar updated",
          description: "Your profile picture has been updated successfully.",
          duration: 3000,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      dateOfBirth: user?.dateOfBirth || "",
      presentAddress: user?.presentAddress || "",
      permanentAddress: user?.permanentAddress || "",
      city: user?.city || "",
      postalCode: user?.postalCode || "",
      country: user?.country || "",
    },
  });

  React.useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        username: user.username,
        email: user.email,
        password: "",
        dateOfBirth: user.dateOfBirth,
        presentAddress: user.presentAddress,
        permanentAddress: user.permanentAddress,
        city: user.city,
        postalCode: user.postalCode,
        country: user.country,
      });
    }
  }, [user, form]);

  function onSubmit(data: ProfileFormValues) {
    const { password, ...updateData } = data;
    dispatch(updateUser(updateData));
    toast({
      title: "Changes saved successfully",
      description: "Your profile has been updated.",
      duration: 3000,
    });
  }
  if (isLoading) {
    return (
      <Layout title="Settings">
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Settings">
      <div className="space-y-6">
        <Tabs defaultValue="profile" className="space-y-6 section_card ">
          <TabsList className="flex justify-start border-b-2 border-[#F4F5F7] w-full rounded-none h-auto space-x-6">
            <TabsTrigger
              value="profile"
              className="rounded-none border-b-[3px] w-[114px] border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3"
            >
              Edit Profile
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="rounded-none border-b-[3px] w-[114px] border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3"
            >
              Preferences
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="rounded-none border-b-[3px] w-[114px]  border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3"
            >
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6 space-y-8">
            <div className="gap-6 p-6 flex justify-between flex-col md:flex-row">
              <div className="w-[250px] flex justify-center">
                <div className="flex flex-col items-center text-center w-24 h-24 relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <img
                    src={user?.avatar}
                    className="size-[90px] rounded-full object-cover cursor-pointer"
                    onClick={handleAvatarClick}
                  />{" "}
                  <div className="size-[30px] bg-black absolute rounded-full right-0 bottom-0 flex justify-center items-center">
                    <img
                      src="/icons/pencil.svg"
                      onClick={handleAvatarClick}
                      className="size-[15px]"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 flex flex-col"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Charlene Reed" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>User Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Charlene Reed" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="charlenereed@gmail.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="••••••••"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="San Jose" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="presentAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Present Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="San Jose, California, USA"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="permanentAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Permanent Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="San Jose, California, USA"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="45962" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="USA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button
                        type="submit"
                        className="bg-black text-white hover:bg-black/90 w-full lg:w-[190px]"
                      >
                        Save
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences">
            <p className="text-muted-foreground pt-6">
              Preferences settings coming soon.
            </p>
          </TabsContent>

          <TabsContent value="security">
            <p className="text-muted-foreground py-6">
              Security settings coming soon.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
