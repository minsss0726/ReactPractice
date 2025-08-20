import React, { useState } from 'react';
import { QrCode, KeyRound, Home, LogIn, LogOut, MessageCircle, CreditCard, Shield, Zap, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const PinInput = ({ onSubmit }) => {
  const [pin, setPin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.length === 4) {
      onSubmit(pin);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pin">4자리 PIN 코드를 입력하세요</Label>
        <Input
          id="pin"
          type="password"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
          placeholder="****"
          className="text-center text-2xl tracking-widest"
        />
      </div>
      <Button type="submit" className="w-full" disabled={pin.length !== 4}>
        결제하기
      </Button>
    </form>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <Card className="border-border/50 hover:border-blue-200 transition-colors">
    <CardHeader className="text-center">
      <div className="mx-auto mb-2 p-3 bg-blue-50 rounded-full w-fit">
        {icon}
      </div>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-center">{description}</CardDescription>
    </CardContent>
  </Card>
);

const TestimonialCard = ({ name, rating, comment, avatar }) => (
  <Card className="border-border/50">
    <CardContent className="pt-6">
      <div className="flex items-center gap-3 mb-4">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{name}</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-muted-foreground">{comment}</p>
    </CardContent>
  </Card>
);

const FinTechMainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPinDialog, setShowPinDialog] = useState(false);

  const handlePinSubmit = (pin) => {
    console.log('PIN submitted:', pin);
    setShowPinDialog(false);
  };

  const handleQRScan = () => {
    console.log('QR scan initiated');
  };

  const features = [
    {
      icon: <CreditCard className="w-6 h-6 text-blue-600" />,
      title: "간편 후불 결제",
      description: "QR코드나 PIN으로 간단하게 결제하고 나중에 정산하세요"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "안전한 보안",
      description: "금융권 수준의 보안으로 안전하게 거래를 보호합니다"
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "즉시 승인",
      description: "실시간 결제 승인으로 빠르고 편리한 결제 경험을 제공합니다"
    }
  ];

  const testimonials = [
    {
      name: "김민수",
      rating: 5,
      comment: "정말 편리해요! 카드 없이도 간편하게 결제할 수 있어서 좋습니다.",
    },
    {
      name: "이지영",
      rating: 5,
      comment: "후불 결제 시스템이 정말 혁신적이에요. 추천합니다!",
    },
    {
      name: "박준호",
      rating: 4,
      comment: "보안도 안전하고 사용법도 간단해서 만족스럽습니다.",
    }
  ];

  const faqItems = [
    {
      question: "후불 결제는 어떻게 작동하나요?",
      answer: "QR코드나 PIN을 통해 결제하시면, 설정하신 날짜에 자동으로 계좌에서 출금됩니다."
    },
    {
      question: "결제 한도는 얼마인가요?",
      answer: "개인 신용도에 따라 월 최대 100만원까지 이용 가능합니다."
    },
    {
      question: "보안은 안전한가요?",
      answer: "금융감독원 인증을 받은 보안 시스템으로 모든 거래가 암호화되어 처리됩니다."
    },
    {
      question: "수수료가 있나요?",
      answer: "기본 결제는 무료이며, 일부 부가 서비스에만 소액의 수수료가 발생합니다."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" size="icon">
            <Home className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-blue-600">PayLater</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsLoggedIn(!isLoggedIn)}
          >
            {isLoggedIn ? <LogOut className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Payment Methods */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6">간편 결제</h2>
          <div className="grid grid-cols-1 gap-4">
            <Button
              onClick={handleQRScan}
              className="h-16 text-lg bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <QrCode className="w-6 h-6 mr-3" />
              QR 코드 스캔
            </Button>
            
            <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="h-16 text-lg border-blue-200 hover:bg-blue-50"
                  size="lg"
                >
                  <KeyRound className="w-6 h-6 mr-3" />
                  PIN 코드 입력
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>PIN 코드 결제</DialogTitle>
                  <DialogDescription>
                    안전한 결제를 위해 4자리 PIN 코드를 입력해주세요.
                  </DialogDescription>
                </DialogHeader>
                <PinInput onSubmit={handlePinSubmit} />
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* AI Character */}
        <section className="text-center py-8">
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-16 h-16 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">AI 도우미</h3>
          <p className="text-muted-foreground mb-4">
            궁금한 것이 있으시면 언제든 물어보세요!
          </p>
          <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
            대화 시작하기
          </Button>
        </section>

        {/* Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-center">주요 기능</h2>
          <div className="grid grid-cols-1 gap-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-center">사용자 후기</h2>
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                rating={testimonial.rating}
                comment={testimonial.comment}
              />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-center">자주 묻는 질문</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 PayLater. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FinTechMainPage;
