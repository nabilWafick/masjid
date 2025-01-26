import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import Image from "next/image"

interface NewsCardProps {
  title: string
  date: string
  image: string
  excerpt: string
}

export function NewsCard({ title, date, image, excerpt }: NewsCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader>
        <div className="text-sm text-muted-foreground">
          {formatDate(date)}
        </div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">
          {excerpt}
        </p>
      </CardContent>
    </Card>
  )
}