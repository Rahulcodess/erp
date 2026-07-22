import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChallansPage() {
  return (
    <div className="flex justify-center pt-16">
      <Card className="w-full max-w-xl text-center">
        <CardHeader>
          <CardTitle className="text-3xl">
            Sales Challans
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground text-lg">
            🚧 This feature is currently under development.
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            Coming Soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}