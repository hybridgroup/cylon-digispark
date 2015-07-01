#include <node.h>
#include <nan.h>
#include <v8.h>
#include "littleWire.h"
#include "littleWire_servo.h"

using namespace v8;

class Digispark : public node::ObjectWrap {
  public:
    static void Init(v8::Handle<v8::Object> exports);
  private:
    explicit Digispark(littleWire* lw);
    ~Digispark();
    static NAN_METHOD(New);
    static NAN_METHOD(FirmwareVersion);
    static NAN_METHOD(DigisparkSearch);
    static NAN_METHOD(DigitalWrite);
    static NAN_METHOD(DigitalRead);
    static NAN_METHOD(ServoWrite);
    static NAN_METHOD(PWMWrite);
    static NAN_METHOD(PinMode);
    static v8::Persistent<v8::Function> constructor;
    littleWire* lw_;
    bool servo;
    bool pwm;
    unsigned char ch0;
    unsigned char ch1;
    unsigned char ch2;
};

Persistent<Function> Digispark::constructor;

Digispark::Digispark(littleWire* lw) : lw_(lw) {
}

Digispark::~Digispark() {
}

void Digispark::Init(Handle<Object> exports) {
  // Prepare constructor template
  Local<FunctionTemplate> tpl = NanNew<FunctionTemplate>(New);

  tpl->SetClassName(NanNew("Digispark"));
  tpl->InstanceTemplate()->SetInternalFieldCount(6);

  // Prototype
  tpl->PrototypeTemplate()->Set(NanNew("firmwareVersion"),NanNew<FunctionTemplate>(FirmwareVersion)->GetFunction());
  tpl->PrototypeTemplate()->Set(NanNew("digisparkSearch"),NanNew<FunctionTemplate>(DigisparkSearch)->GetFunction());
  tpl->PrototypeTemplate()->Set(NanNew("pinMode"),NanNew<FunctionTemplate>(PinMode)->GetFunction());
  tpl->PrototypeTemplate()->Set(NanNew("digitalWrite"),NanNew<FunctionTemplate>(DigitalWrite)->GetFunction());
  tpl->PrototypeTemplate()->Set(NanNew("digitalRead"),NanNew<FunctionTemplate>(DigitalRead)->GetFunction());
  tpl->PrototypeTemplate()->Set(NanNew("servoWrite"),NanNew<FunctionTemplate>(ServoWrite)->GetFunction());
  tpl->PrototypeTemplate()->Set(NanNew("pwmWrite"),NanNew<FunctionTemplate>(PWMWrite)->GetFunction());

  NanAssignPersistent<Function>(constructor, tpl->GetFunction());
  exports->Set(NanNew<String>("Digispark"), tpl->GetFunction());
}

NAN_METHOD(Digispark::New) {
  NanScope();
  Digispark* obj = new Digispark(littleWire_connect());
  obj->Wrap(args.This());
  obj->servo = false;
  obj->pwm = false;
  obj->ch0 = 0;
  obj->ch1 = 0;
  obj->ch2 = 0;
  NanReturnValue(args.This());
}

NAN_METHOD(Digispark::FirmwareVersion) {
  NanScope();
  Digispark* obj = ObjectWrap::Unwrap<Digispark>(args.This());
  NanReturnValue(NanNew<Number>(readFirmwareVersion(obj->lw_)));
}

NAN_METHOD(Digispark::DigisparkSearch) {
  NanScope();
  NanReturnValue(NanNew<Number>(littlewire_search()));
}

NAN_METHOD(Digispark::DigitalWrite) {
  NanScope();
  Digispark* obj = ObjectWrap::Unwrap<Digispark>(args.This());
  unsigned char p = char(NanNew<Number>(args[0]->NumberValue())->Value());
  unsigned char v = char(NanNew<Number>(args[1]->NumberValue())->Value());
  digitalWrite(obj->lw_, p, v);
  NanReturnValue(NanNew<Boolean>(true));
}

NAN_METHOD(Digispark::DigitalRead) {
  NanScope();
  Digispark* obj = ObjectWrap::Unwrap<Digispark>(args.This());
  unsigned char p = char(NanNew<Number>(args[0]->NumberValue())->Value());
  Local<Function> cb = Local<Function>::Cast(args[1]);
  const unsigned argc = 1;
  Local<Value> argv[argc] = { NanNew(NanNew<Number>(digitalRead(obj->lw_, p))) };
  cb->Call(NanGetCurrentContext()->Global(), argc, argv);
  NanReturnUndefined();
}

NAN_METHOD(Digispark::PinMode) {
  NanScope();
  Digispark* obj = ObjectWrap::Unwrap<Digispark>(args.This());
  unsigned char p = char(NanNew<Number>(args[0]->NumberValue())->Value());
  unsigned char v = char(NanNew<Number>(args[1]->NumberValue())->Value());
  pinMode(obj->lw_, p, v);
  NanReturnValue(NanNew<Boolean>(true));
}

NAN_METHOD(Digispark::ServoWrite) {
  NanScope();
  Digispark* obj = ObjectWrap::Unwrap<Digispark>(args.This());
  if (obj->servo == false) {
    servo_init(obj->lw_);
    obj->servo = true;
  }
  unsigned char angle = char(NanNew<Number>(args[0]->NumberValue())->Value());
  servo_updateLocation(obj->lw_, angle, angle);
  NanReturnValue(NanNew<Boolean>(true));
}

NAN_METHOD(Digispark::PWMWrite) {
  NanScope();
  Digispark* obj = ObjectWrap::Unwrap<Digispark>(args.This());
  if (obj->pwm == false) {
    softPWM_state(obj->lw_, ENABLE);
    obj->pwm = true;
  }
  unsigned char pin = char(NanNew<Number>(args[0]->NumberValue())->Value());
  unsigned char val = char(NanNew<Number>(args[1]->NumberValue())->Value());
  switch(pin) {
    case 0:
      obj->ch0 = val;
      break;
    case 1:
      obj->ch1 = val;
      break;
    case 2:
      obj->ch2 = val;
    break;
  }
  softPWM_write(obj->lw_, obj->ch0, obj->ch1, obj->ch2);
  NanReturnValue(NanNew<Boolean>(true));
}

void InitAll(Handle<Object> exports) {
  Digispark::Init(exports);
}

NODE_MODULE(digispark, InitAll)
