"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const logoVariants = {
    initial: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      rotate: -10
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const buttonVariants = {
    initial: { 
      opacity: 0, 
      y: 40,
      scale: 0.8
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        type: "spring" as const,
        stiffness: 120
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#2C003E] to-[#4B0082] p-4 relative overflow-hidden">
      
      {/* Decorative animated background elements */}
      <motion.div 
        className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-5 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col items-center justify-center"
      >
        {/* Auth Up Logo */}
        <motion.div 
          variants={logoVariants}
          className="mb-16"
        >
          <div className="flex items-center justify-center space-x-3">
            <motion.div 
              className="w-16 h-16 rounded-xl bg-green-500 flex items-center justify-center text-white font-bold shadow-lg"
              whileHover={{ 
                rotate: 360,
                scale: 1.1,
                transition: { duration: 0.6 }
              }}
            >
              <svg
                className="w-10 h-10 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
            <motion.h1 
              className="text-6xl font-bold text-white bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-lg"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              Auth Up
            </motion.h1>
          </div>
        </motion.div>

        {/* Signup Text */}
        <motion.div 
          variants={itemVariants}
          className="mb-8 text-center"
        >
          <motion.h2 
            className="text-3xl font-semibold text-white/90"
            whileHover={{
              scale: 1.02,
              color: "#ffffff",
              transition: { duration: 0.2 }
            }}
          >
            Signup
          </motion.h2>
          <motion.p 
            className="text-white/70 mt-2 text-lg"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 2, duration: 0.8 }
            }}
          >
            Get started with your secure authentication
          </motion.p>
        </motion.div>

        {/* Signup Button */}
        <motion.div 
          variants={buttonVariants}
        >
          <Link href="/signup">
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
            >
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Get Started
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="h-5 w-5 ml-2" />
                </motion.div>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
