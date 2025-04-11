<template>
    <div>
      <CForm ref="eventForm" class="needs-validation">
        <CRow class="mb-3">
              <CCol md="12">
                    <CFormLabel>Competition Code</CFormLabel>
                      <CFormInput required v-model="eventData.event_code" readonly name="event_code" :maxlength="8" placeholder="Enter Code" />
              </CCol>
        </CRow>
        <div>
        <CCard class="mb-5">
          <CCardHeader component="h5">Create New Event</CCardHeader>
          <CCardBody>
            <br><CCardHeader component="h6"><center>Competitions Details</center></CCardHeader><br>
            <!-- <CInputGroup class="mb-3"> -->
              
              <CRow class="mb-3">
                <CCol md="12">
                        <CFormLabel for="event_name">Competition Title</CFormLabel>
                        <CFormInput required v-model="eventData.event_name" id="event_name" placeholder="Enter Competition Title" name="event_name" />
                    </CCol>
              </CRow>
            <!-- </CInputGroup> -->
            <CRow class="mb-3">
                  <CCol md="6">
                        <CFormLabel>Event By</CFormLabel>
                        <CFormSelect aria-label="Class Type" name="event_type" id="event_type" >
                            <option value="avishkaar">Avishkaar</option>
                            <option value="other">Other</option>
                        </CFormSelect>
                    </CCol>
                    <CCol md="6">
                    <CFormLabel>Event Location</CFormLabel>
                    <CFormSelect aria-label="Class Type" name="event_venue">
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                    </CFormSelect>
                    </CCol>
            </CRow>
            <CRow class="mb-3">
                    <CCol md="12">
                            <CFormLabel for="event_address">Address</CFormLabel>
                            <CFormInput required v-model="eventData.event_address" name="event_address" placeholder="Enter Address" />
                    </CCol>
            </CRow>
            <CRow class="mb-3">
                    <CCol md="12">
                            <CFormLabel for="event_theme">Event Theme</CFormLabel>
                            <CFormInput required v-model="eventData.event_theme" name="event_theme" placeholder="Enter Event Theme" />
                    </CCol>
            </CRow>
            <CRow class="mb-3">
              <CCol md="12">
                    <CFormLabel>Event Category</CFormLabel>
                    <CFormSelect aria-label="Class Type" name="level" id="level" v-model='eventCatgChoice' @change="toggleFeeCatg($event.target.value)">
                      <option :selected="eventCatgChoice==='na'" value="na">N/A</option>
                      <option :selected="eventCatgChoice==='Jr/Sr'" value="Jr/Sr">Junior-Senior</option>
                      <option :selected="eventCatgChoice==='Jr/M/Sr'" value="Jr/M/Sr">Junior-Middle-Senior</option>
                      <option :selected="eventCatgChoice==='Pre/Jr/M/Sr'" value="Pre/Jr/M/Sr">Pre-Junior-Middle-Senior</option>
                    </CFormSelect>
              </CCol>
            </CRow>
            <CRow class="mb-3">
                    <CCol md="6">
                        <CFormLabel for="event_start_date">Event Start Date</CFormLabel>
                        <CFormInput required type="date" name="event_start_date" :value="eventData.event_start_date" placeholder="Enter Event Start Date"  />
                    </CCol>
                    <CCol md="6">
                        <CFormLabel for="event_end_date">Event End Date</CFormLabel>
                        <CFormInput required type="date" name="event_end_date" :value="eventData.event_end_date" placeholder="Enter Event End Date"  />
                    </CCol>
            </CRow>
            <CRow class="mb-3">
                    <CCol md="6">
                        <CFormLabel for="registration_start_date">Registration Start Date</CFormLabel>
                        <CFormInput required type="date" name="registration_start_date" :value="eventData.registration_start_date" placeholder="Enter registration Start Date"  />
                    </CCol>
                    <CCol md="6">
                        <CFormLabel for="registration_end_date">Registration End Date</CFormLabel>
                        <CFormInput required type="date" name="registration_end_date" :value="eventData.registration_end_date" placeholder="Enter registration End Date"  />
                    </CCol>
            </CRow>
            <CRow class="mb-3">
                    <CCol md="6">
                      <CFormLabel>Team options</CFormLabel>
                        <CFormSelect aria-label="Class Type" class="team_options" name="team_options">
                          <option :selected="eventData.team_options==='single'" value="single">Single Member</option>
                          <option :selected="eventData.team_options==='multiple'" value="multiple">Multiple Member</option>
                        </CFormSelect>
                    </CCol>
                    <CCol md="6">
                      <CFormLabel>Event For</CFormLabel>
                        <CFormSelect aria-label="Class Type" class="event_for" name="event_for">
                          <option :selected="eventData.event_for==='individual'" value="individual">Individual</option>
                          <option :selected="eventData.event_for==='institutional'" value="institutional">Institutional</option>
                          <option :selected="eventData.event_for==='both'" value="both">Both Above</option>
                        </CFormSelect>
                    </CCol>
            </CRow>
            <CRow class="mb-3">
                    <CCol md="12">
                            <CFormLabel for="team_size">Team Size</CFormLabel>
                            <CFormInput type="number" required v-model="eventData.team_size" name="team_size" placeholder="Enter Size" />
                    </CCol>
            </CRow>
            <br><CCardHeader component="h6"><center>Fee Structure</center></CCardHeader><br>
            <CRow class="mb-3">
              <CCol >
                    <CFormLabel>Payment Type</CFormLabel>
                    <CFormSelect aria-label="Class Type" @change="toggleFeeFull($event.target.value)" name="payment_type" v-model="feesFull">
                        <option :selected="eventData.payment_type==='free'" value="free">Free</option>
                        <option :selected="eventData.payment_type==='stage_wise'" value="stage_wise">Stage-wise</option>
                        <option :selected="eventData.payment_type==='full'" value="full">Full</option>
                    </CFormSelect>
              </CCol>
              <CCol v-if="isCatg && feesFull!='free' ">
                    <CFormLabel>Fees categorised ?</CFormLabel>
                    <CFormSelect aria-label="Class Type" id="fee_catgorised" name="fee_catgorised" v-model="feesCatgorised" @change="toggleFeeCategorised($event.target.value)">
                      <option :selected="eventData.fee_catgorised===''" value="">Select option..</option>
                      <option :selected="eventData.fee_catgorised==='yes'" value="yes">Yes</option>
                      <option :selected="eventData.fee_catgorised==='no'" value="no">No</option>
                    </CFormSelect>
              </CCol>
            </CRow>
            <CRow class="mb-3" v-if="feesFull=='full' && (feesCatgorised=='no' || feesCatgorised=='')">
                    <CCol md="12">
                            <CFormLabel for="registration_fees">Registration Fees</CFormLabel>
                            <CFormInput required id="registration_fees" name="registration_fees" type="number"/>
                    </CCol>
            </CRow>
            <CRow class="mb-3" v-if="isCatg">
              <CCol v-if="isCatg">
                    <CFormLabel>Stage categorised ?</CFormLabel>
                    <CFormSelect aria-label="Class Type" id="stage_catgorised" name="stage_catgorised" v-model="stageCatgorised" @change="toggleStageCategorised($event.target.value)">
                      <option :selected="eventData.stage_catgorised===''" value="">Select option..</option>
                      <option :selected="eventData.stage_catgorised==='yes'" value="yes">Yes</option>
                      <option :selected="eventData.stage_catgorised==='no'" value="no">No</option>
                    </CFormSelect>
              </CCol>
            </CRow>
            <CRow class="mb-3" v-if="feesFull=='full' && feesCatgorised=='yes' &&stageUIArray.length" v-for="(catgText, cInx) in stageUIArray" :key="cInx">
                    <CCol md="12">
                            <CFormLabel for="registration_fees">{{catgText}} Registration Fees</CFormLabel>
                            <CFormInput required :id="catgText+'registration_fees'" :name="catgText+'_registration_fees'" :value="eventData[`${catgText}_registration_fees`]" type="number"/>
                    </CCol>
            </CRow>
            <br><CCardHeader component="h6"><center>Competition Stages</center></CCardHeader><br>
            <CCard v-if="isStageCatg" class="comp-catg-yes" v-for="(catgText, cInx) in stageUIArray" :key="cInx">
              <CCardHeader component="h6">{{ catgText }} Stages</CCardHeader>
              <CCardBody>
                  <CRow class="mb-3">
                          <CCol md="12">
                                  <CFormLabel for="stages_no">No. of Stages</CFormLabel>
                                  <div class="d-flex">
                                    <CFormInput required id="stages_no" type="number" :name="catgText+'_no_stages'" :defaultValue="eventData[`${catgText}_no_stages`]"  v-model="noStages[catgText]" v-on:keyup="clearStages(catgText)"/>
                                    <CButton type="button" color="danger" @click="toggleStageNumber(catgText)">Create</CButton>
                                  </div>
                          </CCol>
                  </CRow>
                  <CCard class="mb-5 main-stage" v-if="noStages[catgText]" v-for="index in noStagesArray[catgText]" :key="index">
                    <CCardHeader component="h6">Stage {{index+1}} ({{ catgText }})</CCardHeader>
                    <CCardBody>
                      <CRow class="mb-3" v-if="feesFull=='stage_wise'">
                          <CCol md="12">
                                  <CFormLabel for="stage_registration_fees">Registration Fees</CFormLabel>
                                  <CFormInput required :id="catgText +'_stage_registration_fees_' + index" :value="eventData[`${catgText}_stage_registration_fees_${index}`]" :name="catgText +'_stage_registration_fees_' + index" type="number"/>
                          </CCol>
                      </CRow>

                      <CRow class="mb-3" v-for="(inx, key) in tasks[catgText][index]" :key="key">
                        <CCol md="12">
                            <CFormLabel :for="'task_' + inx">Tasks {{ inx + 1 }}</CFormLabel>
                            <div class="d-flex">
                              <CFormSelect :id="'task_' + inx" :name="catgText + '_task_' + index + inx" v-model="taskList[catgText][index][inx]" placeholder="Enter Display Image" >
                                <option :selected="Number(eventData[`${catgText}_task_${index}${inx}`])==task.task_id" :value="task.task_id" v-for="(task,taskInx) in taskDBList" :key="taskInx">{{task.task_title}}</option>
                              </CFormSelect>
                              <CButton v-if="inx==tasks[catgText][index].length-1 && inx!=0" type="button" color="danger" @click="removeTaskInput(inx,index,catgText)">Delete</CButton>
                            </div>
                        </CCol>
                      </CRow>

                      <CRow class="mb-3">
                        <CCol md="12">
                          <CButton type="button" color="primary" @click="addTaskInput(index,catgText)">Add Task</CButton>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
              </CCardBody>
            </CCard>
            <div v-else class="comp-catg-no">
                  <CRow class="mb-3">
                          <CCol md="12">
                                  <CFormLabel for="stages_no">No. of Stages</CFormLabel>
                                  <div class="d-flex">
                                    <CFormInput required id="stages_no" name="na_stages_no" :value="eventData.na_stages_no" type="number" v-model="noStages['na']" v-on:keyup="clearStages('na')"/>
                                    <CButton type="button" color="danger" @click="toggleStageNumber('na')">Create</CButton>
                                  </div>
                          </CCol>
                  </CRow>
                  
                  <CCard class="mb-5 main-stage" v-if="noStages['na']" v-for="index in noStagesArray['na']" :key="index">
                    <CCardHeader component="h6">Stage {{index+1}}</CCardHeader>
                    <CCardBody>
                      <CRow class="mb-3" v-if="feesFull=='stage_wise' && eventCatgChoice=='na'">
                          <CCol md="12">
                                  <CFormLabel for="na_stage_registration_fees">Registration Fees</CFormLabel>
                                  <CFormInput required :id="'na_stage_registration_fees_' + index" :name="'na_stage_registration_fees_' + index" :value="eventData[`na_stage_registration_fees_${index}`]"  type="number"/>
                          </CCol>
                      </CRow>
                      <CRow class="mb-3" v-if="feesFull=='stage_wise' && stageUIArray.length" v-for="(catgText, cInx) in stageUIArray" :key="cInx">
                          <CCol md="12">
                                  <CFormLabel for="stage_registration_fees">{{catgText}} Registration Fees</CFormLabel>
                                  <CFormInput required :id="catgText + '_stage_registration_fees_' + index" :name="catgText + '_stage_registration_fees_' + index" :value="eventData[`${catgText}_stage_registration_fees_${index}`]" type="number"/>
                          </CCol>
                      </CRow>
                      <!-- <CRow class="mb-3" v-else-if="feesFull=='full'">
                          <CCol md="12">
                                  <CFormLabel for="catg_registration_fees">Registration Fees</CFormLabel>
                                  <CFormInput required :id="catgText +'_catg_registration_fees_'" type="number"/>
                          </CCol>
                      </CRow> -->
                      <CRow class="mb-3" v-for="(inx, key) in tasks['na'][index]" :key="key">
                        <CCol md="12">
                            <CFormLabel :for="'task_' + inx">Tasks {{ inx + 1 }}</CFormLabel>
                            <div class="d-flex">
                              <CFormSelect :id="'task_' + inx" :name="index + '_na_task_' + inx" v-model="taskList['na'][index][inx]" placeholder="Enter Display Image" >
                                <option :selected="Number(eventData[`${index}_na_task_${inx}`])==task.task_id" :value="task.task_id" v-for="(task,taskInx) in taskDBList" :key="taskInx">{{task.task_title}}</option>
                              </CFormSelect>
                              <CButton v-if="inx==tasks['na'][index].length-1 && inx!=0" type="button" color="danger" @click="removeTaskInput(inx,index,'na')">Delete</CButton>
                            </div>
                        </CCol>
                      </CRow>

                      <CRow class="mb-3">
                        <CCol md="12">
                          <CButton type="button" color="primary" @click="addTaskInput(index,'na')">Add Task</CButton>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
            </div>
            <br><CCardHeader component="h6"><center>Competition UI Elements</center></CCardHeader><br>

            <CRow class="mb-3">
                    <CCol md="6">
                        <CFormLabel for="event_logo">Event Logo</CFormLabel>
                        <CFormInput required id="event_logo" name="event_logo" :value="eventData.event_logo" placeholder="Enter Event Logo"  />
                    </CCol>
                    <CCol md="6">
                        <CFormLabel for="event_banner">Event Banner</CFormLabel>
                        <CFormInput required id="event_banner" name="event_banner" :value="eventData.event_banner" placeholder="Enter Event Banner"  />
                    </CCol>
            </CRow>
            <CRow class="mb-3">
                    <CCol md="12">
                        <CFormLabel for="event_desc">Event Description Text</CFormLabel>
                        <CFormInput required id="brief" name="brief" :value="eventData.brief" placeholder="Enter text"  />
                    </CCol>
            </CRow>
            <CRow class="mb-3" v-for="(index, key) in imageInputs" :key="key">
                  <CCol md="12">
                      <CFormLabel :for="'event_thumb_' + index">Event Display Image {{ index + 1 }}</CFormLabel>
                      <div class="d-flex">
                        <CFormInput required :id="'event_thumb_' + index" :name="'event_thumb_' + index" :defaultValue="eventData[`event_thumb_${index}`]" v-model="s3Links[index]" placeholder="Enter Display Image" />
                        <CButton v-if="index==imageInputs.length-1 && index!=0" type="button" color="danger" @click="removeImageInput(index)">Delete</CButton>
                      </div>
                  </CCol>
            </CRow>
            <CRow class="mb-3">
              <CCol md="12">
                <CButton type="button" color="primary" @click="addImageInput">Add Image</CButton>
                <!-- <CButton type="button" color="primary" @click="loggin">Add Image</CButton> -->
              </CCol>
            </CRow>
            <CRow class="mb-3">
                    <CCol md="6">
                        <CFormLabel for="event_video_thumbnail_image">Event Video Thumbnail</CFormLabel>
                        <CFormInput required id="event_video_thumbnail_image" name="event_video_thumbnail_image" :value="eventData.event_video_thumbnail_image" placeholder="Enter Event Video Thumbnail"  />
                    </CCol>
                    <CCol md="6">
                        <CFormLabel for="event_video_thumbnail">Event Video</CFormLabel>
                        <CFormInput required id="event_video_thumbnail" name="event_video_thumbnail" :value="eventData.event_video_thumbnail" placeholder="Enter Event Video"  />
                    </CCol>
            </CRow>

            <CCard v-if="isCatg" class="comp-catg-UI-yes" v-for="(catgText, cInx) in stageUIArray" :key="cInx">
              <br><CCardHeader component="h6"><center>{{ catgText }} Fee Card UI</center></CCardHeader><br>
              <CCardBody>
                  <CRow class="mb-3">
                          <CCol>
                              <CFormLabel for="tab_title">Card Title</CFormLabel>
                              <CFormInput required id="tab_title" :name="`fee_UI_Card_title_`+catgText" :value="eventData[`fee_UI_Card_title_${catgText}`]" placeholder="Enter Card Title"  />
                          </CCol>
                  </CRow>
                  <CRow class="mb-3">
                              <CCol>
                                  <CFormLabel for="card_body">Card Body</CFormLabel>
                                  <CFormInput required id="card_body" :name="`fee_UI_Card_body_`+catgText" :value="eventData[`fee_UI_Card_body_${catgText}`]" placeholder="Enter Card Body" />
                              </CCol>
                        </CRow>
                  <CCard>
                  </CCard>
                </CCardBody>
                </CCard>
            <br>

            <br><CCardHeader component="h6"><center>Landing Page UI Tabs</center></CCardHeader><br>
            <CRow class="mb-3">
                          <CCol>
                              <CFormLabel for="ui_tabs_no">Number of Tabs</CFormLabel>
                              <CFormInput required id="ui_tabs_no" name="ui_tabs_no" :value="eventData.ui_tabs_no" placeholder="Enter Tab No." />
                          </CCol>
            </CRow>
            <CCard class="tabs" v-for="(index, key) in tabs" :key="key">
              <CCardBody>
                  <CRow class="mb-3">
                    <CFormLabel for="tab_title">Tab {{ index+1 }} Title</CFormLabel>
                    <div class="d-flex">  
                            <CCol>
                              <CFormInput required id="tab_title" :name="'tab_title_'+index" placeholder="Enter Tab Title" v-model="tabCards[index]" />
                            </CCol>
                            <CButton v-if="index==tabs.length-1 && index!=0" type="button" color="danger" @click="removeTabInput(index)">Delete</CButton>
                      </div>
                  </CRow>
                  <CCard>
                    <CCardBody>
                    <div class="cards" v-for="(cardIndex, keyCard) in cards[index]" :key="keyCard">
                      <CCardHeader component="h6"></CCardHeader>
                        <CRow class="mb-3">
                          <CFormLabel for="card_title">Card Title</CFormLabel>  
                            <div class="d-flex">  
                              <CCol>
                                  <CFormInput required id="card_title" :name="index+'_card_title_'+cardIndex" v-model="cardsArray[index][cardIndex]['card_title']" />
                              </CCol>
                            <CButton v-if="cardIndex==cards[index].length-1 && cardIndex!=0" type="button" color="danger" @click="removeCardsInput(index,cardIndex)">Delete</CButton>
                            </div>
                              <CCol>
                                  <CFormLabel for="card_img">Card Img</CFormLabel>
                                  <CFormInput required id="card_img" :name="index+'_card_img_'+cardIndex" v-model="cardsArray[index][cardIndex]['card_img']" />
                              </CCol>
                        </CRow>
                        <CRow class="mb-3">
                              <CCol>
                                  <CFormLabel for="card_body">Card Body</CFormLabel>
                                  <CFormInput required id="card_body" :name="index+'_card_body_'+cardIndex" v-model="cardsArray[index][cardIndex]['card_body']" />
                              </CCol>
                        </CRow>
                    </div>
                    <CRow class="mb-3">
                        <CCol md="12">
                          <CButton type="button" color="primary" @click="addCardInput(index,cardIndex)">Add Cards</CButton>
                        </CCol>
                    </CRow>
                  </CCardBody>
                  </CCard>
                </CCardBody>
                </CCard>
            <br>
              <CRow class="mb-3">
                <CCol md="12">
                  <CButton type="button" color="primary" @click="addTabInput()">Add Tab</CButton>
                </CCol>
              </CRow>
                      
              <CRow class="mb-3">
                  <CCol>
                    <label for="yes"><input type="checkbox" v-model="zonalEvent" />&nbsp;&nbsp;Zonal Event</label>
                  </CCol>
              </CRow>
          </CCardBody>
          <CCard v-if="zonalEvent">
          <CCardBody>
              <div class="cards" v-for="(zoneIndex, keyZone) in zones" :key="keyZone" >
                <CCardHeader component="h6"></CCardHeader>
                <CRow class="mb-3">
                  <CCol>
                    <CFormLabel for="zone_option">Zone</CFormLabel>
                    <div class="d-flex">  
                          <CFormSelect class="form-control" id="zone_option" :name="zoneIndex+ '_zone_option'" v-model="zoneCards[zoneIndex]['zone']">
                              <option :selected="zoneCards[zoneIndex]['zone']==='north'" value="north">North</option>
                              <option :selected="zoneCards[zoneIndex]['zone']==='east'" value="east">East</option>
                              <option :selected="zoneCards[zoneIndex]['zone']==='west'" value="west">West</option>
                              <option :selected="zoneCards[zoneIndex]['zone']==='south'" value="south">South</option>
                              <option :selected="zoneCards[zoneIndex]['zone']==='north-east'" value="north-east">North-East</option>
                              <option :selected="zoneCards[zoneIndex]['zone']==='north-west'" value="north-west">North-West</option>
                              <option :selected="zoneCards[zoneIndex]['zone']==='south-east'" value="south-east">South-East</option>
                              <option :selected="zoneCards[zoneIndex]['zone']==='south-west'" value="south-west">South-West</option>
                          </CFormSelect>
                          <CButton v-if="zoneIndex==zones.length-1 && zoneIndex!=0" type="button" color="danger" @click="removeZoneInput(zoneIndex)">Delete</CButton>
                    </div>
                   </CCol>
                  </CRow>
                  <CRow class="mb-3">
                        <CCol>
                            <CFormLabel for="zonal_name">Zonal Name </CFormLabel>
                            <CFormInput required id="zonal_name" :name="zoneIndex + '_zonal_name'" v-model="zoneCards[zoneIndex]['zonal_name']"  />
                        </CCol>
                        <CCol>
                            <CFormLabel for="channel_partner">Channel Partner</CFormLabel>
                            <CFormInput required id="channel_partner" :name="zoneIndex + '_channel_partner'" v-model="zoneCards[zoneIndex]['channel_partner']"  />
                        </CCol>
                  </CRow>
                  <CRow class="mb-3">
                        <CCol>
                            <CFormLabel for="zone_address">Zone Address</CFormLabel>
                            <CFormInput required id="zone_address" :name="zoneIndex + '_zone_address'"  v-model="zoneCards[zoneIndex]['zone_address']"  />
                        </CCol>
                  </CRow>
              <CRow class="mb-3">
                    <CCol md="12">
                        <CFormLabel for="zonal_start_date">Zonal Start Date</CFormLabel>
                        <CFormInput required type="date" id="zonal_start_date" :name="zoneIndex + '_zonal_start_date'"  placeholder="Enter Event Start Date" v-model="zoneCards[zoneIndex]['zonal_start_date']"  />
                    </CCol>
                    <!-- <CCol md="6">
                        <CFormLabel for="zonal_end_date">Zonal End Date</CFormLabel>
                        <CFormInput required type="date" id="zonal_end_date" :name="zoneIndex + '_zonal_end_date'" placeholder="Enter Event End Date" v-model="zoneCards[zoneIndex]['zonal_end_date']"  />
                    </CCol> -->
             </CRow>
            </div>
              <CRow class="mb-3">
                  <CCol md="12">
                    <CButton type="button" color="primary" @click="addZoneInput()">Add Zone</CButton>
                  </CCol>
              </CRow>
        </CCardBody>
        </CCard>
        <CCardFooter>
            <CButton type="button" @click="submitEvent" color="primary">Edit Event</CButton>
        </CCardFooter>
        </CCard>
        </div>
        </CForm>
    </div>
</template>
<script>
import { CButton, CCardBody, CListGroup } from '@coreui/vue';
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, watch, inject } from 'vue'
import {useStore} from "vuex";
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'BlogPostForm',
  components: {
    CButton,
  },
  setup() {
    const route = useRoute()
    const tabs=ref([0])
    const tabCards = ref([[]])
    const cards=ref([])
    const zones=ref([0])
    const cardsArray = ref([])
    const zoneCards = ref([[]])
    const stageUIArray =ref([])
    const isStageCatg = ref(false)
    const zonalEvent = ref(false)
    const isCatg = ref(false)
    const isFees = ref(false)
    const imageInputs = ref([0])
    let tasks = ref([])
    const s3Links = ref([''])
    const taskList = ref({})
    const noStagesArray = ref([])
    const ctaLink = ref('')
    const eventCatgChoice = ref('na')
    const feesCatgorised = ref('')
    const stageCatgorised = ref('')
    const feesFull = ref('free')
    const noStages = ref([])
    const store = useStore();
    const taskDBList = ref(false);
    const eventForm = ref(null);
    const invalidCode = ref(false);
    const codeSaved = ref(false);
    const allGood = ref(true);
    const eventCode = ref('');
    const router = useRouter();
    const eventData = ref(false);
    const $loading =  inject('$loading');
    
    const checkUnique = (code)=>{
      if(code.length>3){
        store.dispatch('checkEventCode',code).then(res => {
              const isValid = /^[a-z0-9-_]*$/.test(code);
              if(res.data){
                invalidCode.value=true;
                allGood.value=true;
              }
              else if(!isValid){
                invalidCode.value=true;
                allGood.value=true;
              }
              else{
                invalidCode.value=false;
                allGood.value=false;
              }
              // loader.hide()
            }).catch(error => {
              console.log(error)
              // loader.hide()
            })
      }else
        allGood.value=true;
    }

    const codeSelected = ()=>{
      codeSaved.value=true;
    }

    function submitEvent(){
      const form = eventForm.value.$el;
      if (form.checkValidity()) {
          form.reportValidity();
          const loader = $loading.show();
          const formData = new FormData(form);
          const formObject = {};
          formData.forEach((value, key) => {
            formObject[key] = value;
          });
          // formObject.visible=0
          formObject.taskData=taskList.value
          if(zonalEvent.value)
            formObject.zoneData=zoneCards.value
          store.dispatch('editEvent',formObject).then(res => {
              console.log(res)
              if(res==='success'){
                alert("Success: Event Data has been submitted! please wait while we are redirecting to listing page.");
                router.push({ name: "Event Listing" })
              }
              loader.hide()
            }).catch(error => {
              alert("Error: event submission went wrong!");
              console.log(error)
              loader.hide()
            })
       }else{
         form.reportValidity();
       }
    }

    const toggleFeeCatg =(changeVal)=>{
      if(changeVal=='' || changeVal=='na'){
        isCatg.value=false;
        feesCatgorised.value==''
      } 
      else{
        isCatg.value=true;
        stageUIArray.value=changeVal.split("/")
      }
    }
    const toggleStageNumber = (pretext)=>{
      for(let i=0; i<Number(noStages.value[pretext]); i++){
        if(!noStagesArray.value[pretext] ||  !tasks.value[pretext] || !taskList.value[pretext]){
          noStagesArray.value[pretext]=[]
          tasks.value[pretext]=[]
          taskList.value[pretext]=[]
        }
        noStagesArray.value[pretext].push(i)
        tasks.value[pretext].push([...[0]]);
        taskList.value[pretext].push([taskDBList.value[0].task_id])
      }
    }
    const toggleFeeFull =(changeVal)=>{
      if(changeVal=='full' && (feesCatgorised.value=='no' || feesCatgorised.value=='')) 
        isFees.value=true;
      else
        isFees.value=false;
    }
    const toggleFeeCategorised =(changeVal)=>{
      if((feesFull.value=='full' || feesFull.value=='') && changeVal=='no') 
        isFees.value=true;
      else
        isFees.value=false;
    }
    const toggleStageCategorised =(changeVal)=>{
      if(eventCatgChoice.value!='' || eventCatgChoice.value!='na'){
          stageUIArray.value=eventCatgChoice.value.split("/")
      }
      if(changeVal=='' || changeVal=='no'){
        isStageCatg.value=false;
        tasks.value = []
        taskList.value = {}
        noStagesArray.value = []
        noStages.value=[]
      } 
      else{
        isStageCatg.value=true;
      }
    }
    const addTaskInput=(stage,pretext)=>{
      tasks.value[pretext][stage].push(tasks.value[pretext][stage].length);
      taskList.value[pretext][stage].push(''); 
    }
    const removeTaskInput=(index,stage,pretext)=>{
      tasks.value[pretext][stage].splice(index, 1); 
      taskList.value[pretext][stage].splice(index, 1); 
    }
    const addTabInput=()=>{
      tabs.value.push(tabs.value.length);
      tabCards.value.push(''); 
      cards.value.push([0])
      cardsArray.value.push([[]])
    }
    const addCardInput=(tab,card)=>{
      cards.value[tab].push(cards.value[tab].length)
      cardsArray.value[tab].push([])
    }
    const removeTabInput=(index)=>{
      tabCards.value.splice(index, 1); 
      tabs.value.splice(index, 1); 
    }
    const removeCardsInput=(index,cardIndex)=>{
      cardsArray.value[index].splice(cardIndex, 1); 
      cards.value[index].splice(cardIndex, 1); 
    }
    const addImageInput=()=>{
      imageInputs.value.push(imageInputs.value.length);
      s3Links.value.push(''); 
    }
    const removeImageInput=(index)=>{
      imageInputs.value.splice(index, 1); 
      s3Links.value.splice(index, 1); 
    }
    const removeZoneInput=(index)=>{
      zoneCards.value.splice(index, 1); 
      zones.value.splice(index, 1); 
    }
    const clearStages=(pretext)=>{
      tasks.value[pretext] = []
      taskList.value[pretext] = []
      noStagesArray.value[pretext] = []
    }
    const addZoneInput=()=>{
      zones.value.push(zones.value.length)
      zoneCards.value.push([])
    }
    const loggin=()=>{
      console.log(tasks.value)
      console.log(taskList.value)
      console.log(zones.value)
      console.log(zoneCards.value)
    }
    store.dispatch(`getTask`)
         .then(response => {
           if(response){
             console.log(response);
             taskDBList.value = response;
           }else{
             throw('something went wrong!')
           }
         })
         .catch(error => {
                   console.log(error);
         });
    
        if(route.params.event_code != undefined){
            store.dispatch(`getEventByCode`,route.params.event_code)
                .then(response => {
                if(response){
                    eventData.value=response.data
                    eventCatgChoice.value=response.data.level
                    feesFull.value=response.data.payment_type
                    feesCatgorised.value=response.data.fee_catgorised
                    stageCatgorised.value=response.data.stage_catgorised
                    s3Links.value=response.data.event_thumb
                    tabCards.value[0]=response.data.tab_title_0
                    let taskData=response.data.taskData||null;
                    // console.log(s3Links.value, "********************")
                    if(response.data[`0_zone_option`]){
                        zonalEvent.value=true;
                    }
                    let zoneIndex=0;
                    while (response.data[`${zoneIndex}_zone_option`] !== undefined) {
                        zones.value[zoneIndex]=zoneIndex
                        if (!zoneCards.value[zoneIndex]) zoneCards.value[zoneIndex]=[]
                        zoneCards.value[zoneIndex]={
                                zonal_start_date: response.data[`${zoneIndex}_zonal_start_date`],
                                zone_address: response.data[`${zoneIndex}_zone_address`],
                                channel_partner: response.data[`${zoneIndex}_channel_partner`],
                                zonal_name: response.data[`${zoneIndex}_zonal_name`],
                                zone: response.data[`${zoneIndex}_zone_option`]
                        };
                        zoneIndex++;
                    }
                    // console.log( zoneCards.value,"((((((((((((((()))))))))))))))");
                    for(let z=1; z< Number(response.data.ui_tabs_no); z++){
                        tabs.value.push(z)
                        tabCards.value.push(response.data[`tab_title_${z}`])
                    }
                    for(let c=0; c < Number(response.data.ui_tabs_no); c++){
                        let cardIndex = 0;
                        while (response.data[`${c}_card_title_${cardIndex}`] !== undefined) {
                            if(!cards.value[c]){
                                cards.value[c]=[]
                            }
                            cards.value[c].push(cardIndex)

                            if(!cardsArray.value[c])
                                cardsArray.value[c]=[]

                            cardsArray.value[c].push({
                                card_title: response.data[`${c}_card_title_${cardIndex}`],
                                card_body: response.data[`${c}_card_body_${cardIndex}`],
                                card_img: response.data[`${c}_card_img_${cardIndex}`]
                            });
                            cardIndex++;
                        }
                    }
                    for(let z=1; z< response.data.event_thumb.length; z++){
                        imageInputs.value.push(z)
                    }
                    //
                    if(eventCatgChoice.value=='' || eventCatgChoice.value=='na'){
                        isCatg.value=false;
                        feesCatgorised.value==''
                    } 
                    else{
                        isCatg.value=true;
                        stageUIArray.value=eventCatgChoice.value.split("/")
                    }
                    //
                    if(feesFull.value=='full' && (feesCatgorised.value=='no' || feesCatgorised.value=='')) 
                        isFees.value=true;
                    else
                        isFees.value=false;
                    //
                    if(eventCatgChoice.value!='' || eventCatgChoice.value!='na'){
                        stageUIArray.value=eventCatgChoice.value.split("/")
                    }
                    if(stageCatgorised.value=='' || stageCatgorised.value=='no'){
                        isStageCatg.value=false;
                        tasks.value = []
                        taskList.value = {}
                        noStagesArray.value = []
                        noStages.value=[]
                    } 
                    else{
                        isStageCatg.value=true;         
                    }
                    //
                    for(let k=0; k< stageUIArray.value.length; k++){
                        let pretext=stageUIArray.value[k];
                        noStages.value[pretext]=response.data[`${pretext}_no_stages`]
                        if(stageCatgorised.value==''){
                            for(let i=0; i<Number(noStages.value[pretext]); i++){
                                if(!noStagesArray.value[pretext] ||  !tasks.value[pretext] || !taskList.value[pretext]){
                                noStagesArray.value[pretext]=[]
                                tasks.value[pretext]=[]
                                taskList.value[pretext]=[]
                                }
                                noStagesArray.value[pretext].push(i)
                                tasks.value[pretext].push([...[0]]);
                                taskList.value[pretext].push([0])
                            }
                        }else if(stageCatgorised.value=='yes'){
                            for(let i=0; i<noStages.value[pretext]; i++){
                              if(!noStagesArray.value[pretext])
                                    noStagesArray.value[pretext]=[]
                              noStagesArray.value[pretext].push(i);
                              for (let z = 0; z < taskData[pretext][i].length; z++){
                                if(!tasks.value[pretext] || !taskList.value[pretext]){
                                  tasks.value[pretext]=[]
                                  taskList.value[pretext]=[];
                                }
                                if(!tasks.value[pretext][i] || !taskList.value[pretext][i]){
                                  tasks.value[pretext][i]=[]
                                  taskList.value[pretext][i]=[]
                                }
                                tasks.value[pretext][i].push(z);
                                taskList.value[pretext][i].push(Number(taskData[pretext][i][z]));
                              }
                              
                            }
                        }
                    }
                    //
                    if(taskData)
                      if(stageCatgorised.value=='no'){
                        if(response.data.na_stages_no){
                          let no_of_stages=Number(response.data.na_stages_no);
                          noStages.value['na']=no_of_stages;
                          tasks.value['na']=[];
                          taskList.value['na']=[];
                          for(let i=0; i<no_of_stages; i++){
                            if(!noStagesArray.value['na'])
                                  noStagesArray.value['na']=[]
                            noStagesArray.value['na'].push(i);
                            for (let z = 0; z < taskData['na'][i].length; z++){
                              if(!tasks.value['na'] || !taskList.value['na']){
                                tasks.value['na']=[]
                                taskList.value['na']=[];
                              }
                              if(!tasks.value['na'][i] || !taskList.value['na'][i]){
                                tasks.value['na'][i]=[]
                                taskList.value['na'][i]=[]
                              }
                              tasks.value['na'][i].push(z);
                              taskList.value['na'][i].push(Number(taskData['na'][i][z]));
                            }
                            
                          }
                        }
                      }

                }else{
                    throw('something went wrong!')
                }
                })
                .catch(error => {
                        console.log(error);
                });
        }
    // watch(editorContent, (newValue, oldValue) => {
    //      finalBlog.value=newValue
    //      console.log(newValue)
    // });
    return {
      stageUIArray,
      feesFull,
      imageInputs,
      s3Links,
      isCatg,
      isFees,
      toggleFeeCatg,
      addImageInput,
      removeImageInput,
      toggleFeeFull,
      feesCatgorised,
      toggleFeeCategorised,
      toggleStageNumber,
      noStages,
      taskDBList,
      addTaskInput,
      taskList,
      loggin,
      removeTaskInput,
      tasks,
      noStagesArray,
      clearStages,
      stageCatgorised,
      toggleStageCategorised,
      isStageCatg,
      eventCatgChoice,
      tabs,
      addTabInput,
      tabCards,
      cardsArray,
      cards,
      addCardInput,
      zones,
      zoneCards,
      addZoneInput,
      removeZoneInput,
      removeTabInput,
      removeCardsInput,
      zonalEvent,
      submitEvent,
      eventForm,
      invalidCode,
      checkUnique,
      codeSaved,
      codeSelected,
      allGood,
      eventCode,
      eventData
      }
    },
    validations() {
    return {
      blogTitle: { required },
      blogDesc: { required },
      category: { required },
      publishingDate: { required },
      tags: { required },
      blogURI: { required },
    }
  },
}

</script>