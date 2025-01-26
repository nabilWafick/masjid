import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

interface DonationProgressProps {
  current: number
  target: number
  donorsCount: number
}

export function DonationProgress({ current, target, donorsCount }: DonationProgressProps) {
  const percentage = Math.min((current / target) * 100, 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Objectif de collecte</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={percentage} className="h-2" />
        
        <div className="flex justify-between text-sm">
          <span>{formatCurrency(current)}</span>
          <span className="text-muted-foreground">Objectif: {formatCurrency(target)}</span>
        </div>

        <div className="text-sm text-muted-foreground">
          {donorsCount} donateurs ont déjà participé
        </div>
      </CardContent>
    </Card>
  )
}