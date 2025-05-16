
import React, { useState } from 'react';
import StarryBackground from '@/components/StarryBackground';
import Navigation from '@/components/Navigation';
import { usePeriodContext } from '@/context/PeriodContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const InfoPage = () => {
  const { currentPhase } = usePeriodContext();
  const [activeTab, setActiveTab] = useState("phases");
  
  return (
    <div className="relative min-h-screen overflow-hidden pb-20">
      <StarryBackground />
      
      <div className="relative z-10 max-w-md mx-auto p-4 pt-12">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-aurora-light-purple to-aurora-purple bg-clip-text text-transparent">
            Cycle Information
          </h1>
          <p className="text-white/70">Learn about your menstrual cycle</p>
        </header>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="phases">Cycle Phases</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition & Exercise</TabsTrigger>
          </TabsList>
          
          <TabsContent value="phases" className="space-y-4">
            <Card className="period-phase-card">
              <CardHeader>
                <CardTitle className="text-aurora-purple">Understanding Your Cycle</CardTitle>
                <CardDescription>The four phases of the menstrual cycle</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="menstrual">
                    <AccordionTrigger className="text-aurora-purple">
                      Menstrual Phase (Days 1-5)
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">The menstrual phase begins on the first day of your period when the uterine lining sheds.</p>
                      <p className="mb-2"><strong className="text-aurora-purple">Duration:</strong> Typically 3-7 days</p>
                      <p className="mb-2"><strong className="text-aurora-purple">Hormones:</strong> Estrogen and progesterone levels are low</p>
                      <p><strong className="text-aurora-purple">Common symptoms:</strong> Cramps, fatigue, bloating, headaches, mood changes</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="follicular">
                    <AccordionTrigger className="text-aurora-purple">
                      Follicular Phase (Days 1-13)
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">The follicular phase overlaps with menstruation and continues until ovulation. During this phase, follicles in the ovaries develop and mature.</p>
                      <p className="mb-2"><strong className="text-aurora-purple">Duration:</strong> Typically 7-10 days after menstruation ends</p>
                      <p className="mb-2"><strong className="text-aurora-purple">Hormones:</strong> Estrogen levels rise</p>
                      <p><strong className="text-aurora-purple">Common experiences:</strong> Increased energy, improved mood, heightened senses</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="ovulatory">
                    <AccordionTrigger className="text-aurora-purple">
                      Ovulatory Phase (Days 14-16)
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">Ovulation occurs when a mature egg is released from the ovary and travels down the fallopian tube.</p>
                      <p className="mb-2"><strong className="text-aurora-purple">Duration:</strong> About 24 hours for egg survival; the phase lasts about 3-4 days</p>
                      <p className="mb-2"><strong className="text-aurora-purple">Hormones:</strong> Peak estrogen levels and rise in luteinizing hormone (LH)</p>
                      <p><strong className="text-aurora-purple">Common signs:</strong> Mild pelvic pain or cramping (mittelschmerz), increased cervical mucus, slight rise in basal body temperature, increased libido</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="luteal">
                    <AccordionTrigger className="text-aurora-purple">
                      Luteal Phase (Days 17-28)
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">In the luteal phase, the follicle that released the egg transforms into the corpus luteum, which produces progesterone.</p>
                      <p className="mb-2"><strong className="text-aurora-purple">Duration:</strong> Typically 10-14 days</p>
                      <p className="mb-2"><strong className="text-aurora-purple">Hormones:</strong> Progesterone rises, then both progesterone and estrogen drop if no pregnancy occurs</p>
                      <p><strong className="text-aurora-purple">Common symptoms:</strong> PMS symptoms including mood changes, breast tenderness, bloating, food cravings, headaches, fatigue</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="nutrition" className="space-y-4">
            <Card className="period-phase-card">
              <CardHeader>
                <CardTitle className="text-aurora-purple">Nutrition & Exercise by Phase</CardTitle>
                <CardDescription>Optimize your wellness throughout your cycle</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="menstrual-nutrition">
                    <AccordionTrigger className="text-aurora-purple">
                      Menstrual Phase
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mb-3">
                        <h4 className="font-semibold text-aurora-light-purple mb-1">Nutrition</h4>
                        <ul className="list-disc pl-5">
                          <li>Iron-rich foods: dark leafy greens, beans, lentils</li>
                          <li>Anti-inflammatory foods: fatty fish, berries, turmeric</li>
                          <li>Foods rich in magnesium: dark chocolate, nuts, seeds</li>
                          <li>Warm, comforting foods: soups, stews, herbal teas</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-aurora-light-purple mb-1">Exercise</h4>
                        <ul className="list-disc pl-5">
                          <li>Gentle yoga or stretching</li>
                          <li>Light walking</li>
                          <li>Swimming</li>
                          <li>Focus on recovery and listen to your body</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="follicular-nutrition">
                    <AccordionTrigger className="text-aurora-purple">
                      Follicular Phase
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mb-3">
                        <h4 className="font-semibold text-aurora-light-purple mb-1">Nutrition</h4>
                        <ul className="list-disc pl-5">
                          <li>Fresh fruits and vegetables rich in antioxidants</li>
                          <li>Fermented foods: kimchi, sauerkraut, yogurt</li>
                          <li>Light proteins: fish, chicken, tofu</li>
                          <li>Complex carbohydrates: whole grains, sweet potatoes</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-aurora-light-purple mb-1">Exercise</h4>
                        <ul className="list-disc pl-5">
                          <li>High-intensity interval training (HIIT)</li>
                          <li>Strength training</li>
                          <li>Cardio workouts</li>
                          <li>Try new challenging activities</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="ovulatory-nutrition">
                    <AccordionTrigger className="text-aurora-purple">
                      Ovulatory Phase
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mb-3">
                        <h4 className="font-semibold text-aurora-light-purple mb-1">Nutrition</h4>
                        <ul className="list-disc pl-5">
                          <li>Raw fruits and vegetables</li>
                          <li>Fiber-rich foods: beans, lentils, nuts</li>
                          <li>Fermented foods: kombucha, kefir</li>
                          <li>Anti-inflammatory foods: olive oil, fatty fish</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-aurora-light-purple mb-1">Exercise</h4>
                        <ul className="list-disc pl-5">
                          <li>Circuit training</li>
                          <li>Group fitness classes</li>
                          <li>Dance</li>
                          <li>Activities that boost joy and confidence</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="luteal-nutrition">
                    <AccordionTrigger className="text-aurora-purple">
                      Luteal Phase
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mb-3">
                        <h4 className="font-semibold text-aurora-light-purple mb-1">Nutrition</h4>
                        <ul className="list-disc pl-5">
                          <li>Foods rich in B vitamins: whole grains, eggs, leafy greens</li>
                          <li>Calcium-rich foods: dairy or fortified alternatives</li>
                          <li>Complex carbohydrates: brown rice, oats</li>
                          <li>Magnesium-rich foods: nuts, seeds, dark chocolate</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-aurora-light-purple mb-1">Exercise</h4>
                        <ul className="list-disc pl-5">
                          <li>Pilates</li>
                          <li>Strength training with lower intensity</li>
                          <li>Yoga</li>
                          <li>Nature walks</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="general-advice">
                    <AccordionTrigger className="text-aurora-purple">
                      General Advice
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mb-3">
                        <h4 className="font-semibold text-aurora-light-purple mb-1">Foods to Include Throughout Your Cycle</h4>
                        <ul className="list-disc pl-5">
                          <li>Plenty of water and hydrating foods</li>
                          <li>Omega-3 fatty acids: fatty fish, flaxseeds, walnuts</li>
                          <li>Fiber-rich foods: fruits, vegetables, whole grains</li>
                          <li>Anti-inflammatory herbs and spices: turmeric, ginger, cinnamon</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-aurora-light-purple mb-1">Foods to Limit</h4>
                        <ul className="list-disc pl-5">
                          <li>Caffeine and alcohol</li>
                          <li>Highly processed foods and added sugars</li>
                          <li>Salty foods (especially during bloating)</li>
                          <li>Dairy (for some people who experience increased inflammation)</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Navigation />
    </div>
  );
};

export default InfoPage;
