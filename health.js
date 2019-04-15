/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

/**
 * Sample transaction processor function.
 * @param {org.health.PlacePrescription} tx The sample transaction instance.
 * @transaction
 */

async function place(tx){
  console.log('placePrescription');
  const factory = getFactory();
  const namespace = 'org.health';
  const order= factory.newResource(namespace,'Prescription',tx.placeId);
  order.medicine=tx.medicine;
  order.patientName=tx.patientName;
  order.docterName=tx.docterName;
  order.pickedupLoc= 'CVS';
  //participants
  order.docter=tx.docter;
  order.patient=factory.newRelationship(namespace,'Patient',getCurrentParticipant().getIdentifier());
  order.pharm=factory.newRelationship(namespace,'Pharmacy',getCurrentParticipant().getIdentifier());

  //save the order
  const assetRegistry=await getAssetRegistry(order.getFullyQualifiedType());
  await assetRegistry.add(order);
}


/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

/**
 * Sample transaction processor function.
 * @param {org.health.pickupConfirm} tx The sample transaction instance.
 * @transaction
 */


 async function pick(tx){
  // const factory = getFactory();
  // const namespace = 'org.health';
  // const picked=factory.newResource(namespace,)
  if(tx.patient.patientName!=tx.prescription.patientName){
    throw new Error ("This person is not the pick up person")
  }else if(tx.presId != tx.prescription.presId){
    throw new Error ("Wrong prescription")
  
  }
 }

