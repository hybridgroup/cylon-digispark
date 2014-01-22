#include <string>
#include <stdio.h>
#include <node.h>
#include <v8.h>
#include "littleWire.h"

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
    static v8::Handle<v8::Value> PinMode(const v8::Arguments& args);
    static v8::Persistent<v8::Function> constructor;
    littleWire* lw_;
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
  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  // Prototype
  tpl->PrototypeTemplate()->Set(String::NewSymbol("firmwareVersion"),FunctionTemplate::New(FirmwareVersion)->GetFunction());
  tpl->PrototypeTemplate()->Set(String::NewSymbol("pinMode"),FunctionTemplate::New(PinMode)->GetFunction());
  tpl->PrototypeTemplate()->Set(String::NewSymbol("digitalWrite"),FunctionTemplate::New(DigitalWrite)->GetFunction());
  constructor = Persistent<Function>::New(tpl->GetFunction());
  exports->Set(String::NewSymbol("Digispark"), constructor);
}

Handle<Value> Digispark::New(const Arguments& args) {
  HandleScope scope;

  Digispark* obj = new Digispark(littleWire_connect());
  obj->Wrap(args.This());
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

Handle<Value> Digispark::PinMode(const Arguments& args) {
  HandleScope scope;
  Digispark* obj = ObjectWrap::Unwrap<Digispark>(args.This());
  unsigned char p = char(Number::New(args[0]->NumberValue())->Value());
  unsigned char v = char(Number::New(args[1]->NumberValue())->Value());
  pinMode(obj->lw_, p, v);
  return scope.Close(Boolean::New(true));
}
void InitAll(Handle<Object> exports) {
  Digispark::Init(exports);
}

NODE_MODULE(digispark, InitAll)
