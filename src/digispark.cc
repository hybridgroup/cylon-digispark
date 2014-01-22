#include <node.h>
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
    static v8::Handle<v8::Value> New(const v8::Arguments& args);
    static v8::Handle<v8::Value> FirmwareVersion(const v8::Arguments& args);
    static v8::Handle<v8::Value> DigitalWrite(const v8::Arguments& args);
    static v8::Handle<v8::Value> DigitalRead(const v8::Arguments& args);
    static v8::Handle<v8::Value> ServoWrite(const v8::Arguments& args);
    static v8::Handle<v8::Value> PWMWrite(const v8::Arguments& args);
    static v8::Handle<v8::Value> PinMode(const v8::Arguments& args);
    static v8::Persistent<v8::Function> constructor;
    littleWire* lw_;
    bool servo;
    bool pwm;
};

Persistent<Function> Digispark::constructor;

Digispark::Digispark(littleWire* lw) : lw_(lw) {
}

Digispark::~Digispark() {
}

void Digispark::Init(Handle<Object> exports) {
  // Prepare constructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(New);
  tpl->SetClassName(String::NewSymbol("Digispark"));
  tpl->InstanceTemplate()->SetInternalFieldCount(3);
  // Prototype
  tpl->PrototypeTemplate()->Set(String::NewSymbol("firmwareVersion"),FunctionTemplate::New(FirmwareVersion)->GetFunction());
  tpl->PrototypeTemplate()->Set(String::NewSymbol("pinMode"),FunctionTemplate::New(PinMode)->GetFunction());
  tpl->PrototypeTemplate()->Set(String::NewSymbol("digitalWrite"),FunctionTemplate::New(DigitalWrite)->GetFunction());
  tpl->PrototypeTemplate()->Set(String::NewSymbol("digitalRead"),FunctionTemplate::New(DigitalRead)->GetFunction());
  tpl->PrototypeTemplate()->Set(String::NewSymbol("servoWrite"),FunctionTemplate::New(ServoWrite)->GetFunction());
  tpl->PrototypeTemplate()->Set(String::NewSymbol("pwmWrite"),FunctionTemplate::New(PWMWrite)->GetFunction());
  constructor = Persistent<Function>::New(tpl->GetFunction());
  exports->Set(String::NewSymbol("Digispark"), constructor);
}

Handle<Value> Digispark::New(const Arguments& args) {
  HandleScope scope;
  Digispark* obj = new Digispark(littleWire_connect());
  obj->Wrap(args.This());
  obj->servo = false;
  obj->servo = false;
  return args.This();
}

Handle<Value> Digispark::FirmwareVersion(const Arguments& args) {
  HandleScope scope;
  Digispark* obj = ObjectWrap::Unwrap<Digispark>(args.This());
  return scope.Close(Number::New(readFirmwareVersion(obj->lw_)));
}

Handle<Value> Digispark::DigitalWrite(const Arguments& args) {
  HandleScope scope;
  Digispark* obj = ObjectWrap::Unwrap<Digispark>(args.This());
  unsigned char p = char(Number::New(args[0]->NumberValue())->Value());
  unsigned char v = char(Number::New(args[1]->NumberValue())->Value());
  digitalWrite(obj->lw_, p, v);
  return scope.Close(Boolean::New(true));
}

Handle<Value> Digispark::DigitalRead(const Arguments& args) {
  HandleScope scope;
  Digispark* obj = ObjectWrap::Unwrap<Digispark>(args.This());
  unsigned char p = char(Number::New(args[0]->NumberValue())->Value());
  Local<Function> cb = Local<Function>::Cast(args[1]);
  const unsigned argc = 1;
  Local<Value> argv[argc] = { Local<Value>::New(Number::New(digitalRead(obj->lw_, p))) };
  cb->Call(Context::GetCurrent()->Global(), argc, argv);
  return scope.Close(Undefined());
}

Handle<Value> Digispark::PinMode(const Arguments& args) {
  HandleScope scope;
  Digispark* obj = ObjectWrap::Unwrap<Digispark>(args.This());
  unsigned char p = char(Number::New(args[0]->NumberValue())->Value());
  unsigned char v = char(Number::New(args[1]->NumberValue())->Value());
  pinMode(obj->lw_, p, v);
  return scope.Close(Boolean::New(true));
}

Handle<Value> Digispark::ServoWrite(const Arguments& args) {
  HandleScope scope;
  Digispark* obj = ObjectWrap::Unwrap<Digispark>(args.This());
  if (obj->servo == false) {
    servo_init(obj->lw_);
    obj->servo = true;
  }
  unsigned char angle = char(Number::New(args[0]->NumberValue())->Value());
  servo_updateLocation(obj->lw_, angle, angle);
  return scope.Close(Boolean::New(true));
}

Handle<Value> Digispark::PWMWrite(const Arguments& args) {
  HandleScope scope;
  Digispark* obj = ObjectWrap::Unwrap<Digispark>(args.This());
  if (obj->pwm == false) {
    pwm_init(obj->lw_);
    pwm_updatePrescaler(obj->lw_,1); 
    obj->pwm = true;
  }
  unsigned char val = char(Number::New(args[0]->NumberValue())->Value());
  pwm_updateCompare(obj->lw_, val, val);
  return scope.Close(Boolean::New(true));
}

void InitAll(Handle<Object> exports) {
  Digispark::Init(exports);
}

NODE_MODULE(digispark, InitAll)
