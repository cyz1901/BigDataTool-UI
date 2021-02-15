// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var test_pb = require('./test_pb.js');

function serialize_AddReply(arg) {
  if (!(arg instanceof test_pb.AddReply)) {
    throw new Error('Expected argument of type AddReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddReply(buffer_arg) {
  return test_pb.AddReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AddRequest(arg) {
  if (!(arg instanceof test_pb.AddRequest)) {
    throw new Error('Expected argument of type AddRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddRequest(buffer_arg) {
  return test_pb.AddRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// 服务接口.定义请求参数和相应结果
var AddServiceService = exports.AddServiceService = {
  add: {
    path: '/AddService/add',
    requestStream: false,
    responseStream: false,
    requestType: test_pb.AddRequest,
    responseType: test_pb.AddReply,
    requestSerialize: serialize_AddRequest,
    requestDeserialize: deserialize_AddRequest,
    responseSerialize: serialize_AddReply,
    responseDeserialize: deserialize_AddReply,
  },
};

exports.AddServiceClient = grpc.makeGenericClientConstructor(AddServiceService);
