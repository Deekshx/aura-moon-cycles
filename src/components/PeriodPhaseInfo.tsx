
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PhaseInfoProps {
  currentPhase: string;
}

const PeriodPhaseInfo: React.FC<PhaseInfoProps> = ({ currentPhase }) => {
  const phases = [
    {
      name: "Menstrual",
      days: "3-7 days",
      foods: ["Iron-rich foods (spinach, beans)", "Omega-3 fatty acids (salmon, walnuts)", "Water-rich fruits (watermelon, cucumber)", "Calcium-rich foods (yogurt, fortified plant milk)"],
      exercises: [
        "Light walking",
        "Gentle yoga",
        "Stretching",
        "Swimming",
        "Slow dancing",
        "Tai chi",
        "Meditation with gentle movement",
        "Light stationary cycling",
        "Restorative yoga poses"
      ],
      description: "The menstrual phase begins on the first day of your period and lasts until bleeding stops. Hormone levels are at their lowest during this time."
    },
    {
      name: "Follicular",
      days: "7-10 days",
      foods: ["Fermented foods (kimchi, sauerkraut)", "Lean proteins (chicken, tofu)", "Cruciferous vegetables (broccoli, cauliflower)", "Berries"],
      exercises: [
        "High-intensity workouts",
        "Strength training",
        "Running or jogging",
        "Dance classes",
        "Boxing or kickboxing",
        "Spinning classes",
        "Circuit training",
        "HIIT workouts",
        "Rock climbing",
        "Team sports"
      ],
      description: "The follicular phase overlaps with menstruation and continues until ovulation. Estrogen levels rise, often bringing increased energy."
    },
    {
      name: "Ovulatory",
      days: "3-4 days",
      foods: ["Raw vegetables", "Fresh fruits", "Whole grains", "Fermented foods", "Light proteins"],
      exercises: [
        "Interval training",
        "Circuit training",
        "Hiking",
        "Group fitness classes",
        "Power yoga",
        "Dance cardio",
        "Outdoor cycling",
        "Swimming laps",
        "CrossFit style workouts",
        "Beach volleyball"
      ],
      description: "The ovulatory phase is when an egg is released from the ovary. Energy levels are typically high with peak fertility."
    },
    {
      name: "Luteal",
      days: "10-14 days",
      foods: ["Complex carbohydrates (sweet potatoes, quinoa)", "Magnesium-rich foods (dark chocolate, nuts)", "Anti-inflammatory foods (turmeric, ginger)", "Vitamin B6-rich foods (chickpeas, bananas)"],
      exercises: [
        "Pilates",
        "Light cardio",
        "Weight training",
        "Relaxing yoga",
        "Nature walks",
        "Barre workouts",
        "Moderate strength training",
        "Elliptical training",
        "Deep stretching routines",
        "Swimming"
      ],
      description: "The luteal phase is the time between ovulation and the start of your next period. Progesterone rises, and you may experience PMS symptoms."
    }
  ];

  return (
    <Card className="period-phase-card w-full">
      <CardHeader>
        <CardTitle className="text-aurora-purple">Your Cycle Phases</CardTitle>
        <CardDescription>Learn about the different phases of your menstrual cycle</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={currentPhase.toLowerCase() || "menstrual"}>
          <TabsList className="grid grid-cols-4 mb-4">
            {phases.map((phase) => (
              <TabsTrigger 
                key={phase.name} 
                value={phase.name.toLowerCase()}
                className={currentPhase.toLowerCase() === phase.name.toLowerCase() ? "text-aurora-purple" : ""}
              >
                {phase.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {phases.map((phase) => (
            <TabsContent key={phase.name} value={phase.name.toLowerCase()}>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-aurora-purple mb-1">Duration</h3>
                  <p>{phase.days}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-aurora-purple mb-1">Description</h3>
                  <p>{phase.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-aurora-purple mb-1">Recommended Foods</h3>
                  <ul className="list-disc pl-5">
                    {phase.foods.map((food, index) => (
                      <li key={index}>{food}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-aurora-purple mb-1">Recommended Exercises</h3>
                  <ul className="list-disc pl-5">
                    {phase.exercises.map((exercise, index) => (
                      <li key={index}>{exercise}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PeriodPhaseInfo;
