"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: "What is GetMoreBacklinks.org?",
    answer: "GetMoreBacklinks.org is a semi-automated service that helps boost your online presence by submitting your website or product to multiple directories. With just one click, it provides backlinks to improve your visibility effortlessly."
  },
  {
    question: "How many backlinks can I expect?",
    answer: "GetMoreBacklinks.org provides up to 100 backlinks by listing your website in relevant directories. The actual count may vary based on your product type and directory relevance."
  },
  {
    question: "What types of businesses work best with GetMoreBacklinks.org?",
    answer: "Our service is ideal for SaaS, AI, NoCode, DevTools, and similar industries. It may be less effective for unrelated fields."
  },
  {
    question: "How can I get help before or after purchasing?",
    answer: "Feel free to contact us using the social media links provided at the bottom of our website for any questions or support."
  },
  {
    question: "I've already listed my product in some directories. How can this help me?",
    answer: "We utilize a database of 500+ directories to identify 100 directories where your product is not listed and submit it there, maximizing your reach."
  },
  {
    question: "Does GetMoreBacklinks.org support mobile app listings?",
    answer: "Yes, we support listings for both mobile and web applications."
  },
  {
    question: "Is there a guarantee on the number of backlinks or results?",
    answer: "While we aim to deliver up to 100 backlinks, results depend on your product type and directory relevance. There are no guarantees."
  },
  {
    question: "Is the service fully automated?",
    answer: "GetMoreBacklinks.org combines automation with human oversight. Each activation is manually verified for accuracy."
  },
  {
    question: "Can it improve my website's domain rating?",
    answer: "Yes, by building backlinks across trusted directories, GetMoreBacklinks.org can enhance your domain rating and online visibility."
  },
  {
    question: "If I have DR Above 20, Will it work?",
    answer: "It wont really affect much on the DR but will surely help your backlinks Increase"
  }
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
  columnIndex: number
}

function FAQItem({ question, answer, isOpen, onClick, columnIndex }: FAQItemProps) {
  return (
    <div 
      className="bg-gray-50 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={onClick}
    >
      <div className="p-4 sm:p-6 flex justify-between items-center">
        <h3 className="text-sm sm:text-base font-medium text-black pr-4">{question}</h3>
        <div className="flex-shrink-0">
          {isOpen ? (
            <Minus className="h-5 w-5 text-orange-500" />
          ) : (
            <Plus className="h-5 w-5 text-orange-500" />
          )}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-gray-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const [openIndices, setOpenIndices] = useState<{ [key: number]: number | null }>({
    0: null, // Left column
    1: null  // Right column
  })

  const toggleFAQ = (columnIndex: number, itemIndex: number) => {
    setOpenIndices(prev => ({
      ...prev,
      [columnIndex]: prev[columnIndex] === itemIndex ? null : itemIndex
    }))
  }

  // Split FAQs into two columns
  const leftColumnFAQs = faqs.slice(0, Math.ceil(faqs.length / 2))
  const rightColumnFAQs = faqs.slice(Math.ceil(faqs.length / 2))

  return (
    <section id="faq" className="bg-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-orange-100 border border-orange-200 mb-4">
              <span className="text-orange-600 text-sm font-medium">FAQ's</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-black mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {leftColumnFAQs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndices[0] === index}
                  onClick={() => toggleFAQ(0, index)}
                  columnIndex={0}
                />
              ))}
            </div>
            <div className="space-y-4">
              {rightColumnFAQs.map((faq, index) => (
                <FAQItem
                  key={index + leftColumnFAQs.length}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndices[1] === index}
                  onClick={() => toggleFAQ(1, index)}
                  columnIndex={1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

