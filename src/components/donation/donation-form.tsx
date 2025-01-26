"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  amount: z.string().min(1),
  frequency: z.enum(["once", "monthly", "yearly"]),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
})

export function DonationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      frequency: "once",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission
    console.log(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Faire un don</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <Label>Montant du don</Label>
            <div className="grid grid-cols-3 gap-4">
              {["50", "100", "200"].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  onClick={() => form.setValue("amount", amount)}
                >
                  {amount}€
                </Button>
              ))}
            </div>
            <Input
              placeholder="Autre montant"
              {...form.register("amount")}
            />
          </div>

          <div className="space-y-4">
            <Label>Fréquence</Label>
            <RadioGroup
              defaultValue="once"
              onValueChange={(value) => form.setValue("frequency", value as "once" | "monthly" | "yearly")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="once" id="once" />
                <Label htmlFor="once">Une fois</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Mensuel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly">Annuel</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" {...form.register("firstName")} />
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" {...form.register("lastName")} />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register("email")} />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Faire un don
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}