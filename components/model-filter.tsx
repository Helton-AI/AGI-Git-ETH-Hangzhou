"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

export function ModelFilter() {
  const [priceRange, setPriceRange] = useState([0, 1])
  const [ratingFilter, setRatingFilter] = useState(0)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Filters</h3>
        <Accordion type="multiple" defaultValue={["category", "price", "rating"]}>
          <AccordionItem value="category">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="nlp" />
                  <Label htmlFor="nlp">Natural Language Processing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cv" />
                  <Label htmlFor="cv">Computer Vision</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="audio" />
                  <Label htmlFor="audio">Audio Processing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rl" />
                  <Label htmlFor="rl">Reinforcement Learning</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="framework">
            <AccordionTrigger>Framework</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="pytorch" />
                  <Label htmlFor="pytorch">PyTorch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tensorflow" />
                  <Label htmlFor="tensorflow">TensorFlow</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="jax" />
                  <Label htmlFor="jax">JAX</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="other-framework" />
                  <Label htmlFor="other-framework">Other</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger>Price Range (ETH)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider value={priceRange} min={0} max={1} step={0.01} onValueChange={setPriceRange} />
                <div className="flex items-center justify-between">
                  <Input
                    type="number"
                    value={priceRange[0]}
                    min={0}
                    max={priceRange[1]}
                    step={0.01}
                    onChange={(e) => setPriceRange([Number.parseFloat(e.target.value), priceRange[1]])}
                    className="w-20"
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    min={priceRange[0]}
                    max={1}
                    step={0.01}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseFloat(e.target.value)])}
                    className="w-20"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="rating">
            <AccordionTrigger>Minimum Rating</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider
                  value={[ratingFilter]}
                  min={0}
                  max={5}
                  step={0.5}
                  onValueChange={(value) => setRatingFilter(value[0])}
                />
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={star <= ratingFilter ? "currentColor" : "none"}
                        stroke="currentColor"
                        className={`h-5 w-5 ${star <= ratingFilter ? "text-yellow-500" : "text-muted-foreground"}`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <span>& Up ({ratingFilter.toFixed(1)})</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="license">
            <AccordionTrigger>License</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="mit" />
                  <Label htmlFor="mit">MIT</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="apache" />
                  <Label htmlFor="apache">Apache 2.0</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="gpl" />
                  <Label htmlFor="gpl">GPL</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="proprietary" />
                  <Label htmlFor="proprietary">Proprietary</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Button className="w-full" variant="outline">
        Reset Filters
      </Button>
    </div>
  )
}

